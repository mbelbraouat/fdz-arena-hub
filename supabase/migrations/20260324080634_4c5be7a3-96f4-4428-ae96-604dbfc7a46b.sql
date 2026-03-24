
-- Create game type enum
CREATE TYPE public.game_type AS ENUM ('cs2', 'valorant');

-- Create app role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- Tournaments table
CREATE TABLE public.tournaments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  game game_type NOT NULL DEFAULT 'cs2',
  status TEXT NOT NULL DEFAULT 'upcoming',
  teams_count INTEGER NOT NULL DEFAULT 0,
  prize_pool TEXT NOT NULL DEFAULT '0 DZD',
  start_date DATE,
  end_date DATE,
  stage TEXT DEFAULT 'Group Stage',
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.tournaments ENABLE ROW LEVEL SECURITY;

-- Teams table
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tag TEXT NOT NULL,
  game game_type NOT NULL DEFAULT 'cs2',
  wins INTEGER NOT NULL DEFAULT 0,
  losses INTEGER NOT NULL DEFAULT 0,
  rating NUMERIC(4,2) NOT NULL DEFAULT 1.00,
  rank_change INTEGER NOT NULL DEFAULT 0,
  streak TEXT DEFAULT 'W0',
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- Players table
CREATE TABLE public.players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  game game_type NOT NULL DEFAULT 'cs2',
  maps_played INTEGER NOT NULL DEFAULT 0,
  kd NUMERIC(4,2) NOT NULL DEFAULT 1.00,
  adr NUMERIC(5,1) NOT NULL DEFAULT 0.0,
  kast NUMERIC(4,1) NOT NULL DEFAULT 0.0,
  hs_percentage NUMERIC(4,1) NOT NULL DEFAULT 0.0,
  rating NUMERIC(4,2) NOT NULL DEFAULT 1.00,
  is_mvp BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;

-- Matches table
CREATE TABLE public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID REFERENCES public.tournaments(id) ON DELETE CASCADE,
  team1_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  team2_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  score1 INTEGER NOT NULL DEFAULT 0,
  score2 INTEGER NOT NULL DEFAULT 0,
  map TEXT NOT NULL DEFAULT 'TBD',
  status TEXT NOT NULL DEFAULT 'upcoming',
  match_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  half_scores JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

-- Events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'upcoming',
  teams_count INTEGER NOT NULL DEFAULT 0,
  prize_pool TEXT NOT NULL DEFAULT '0 DZD',
  event_date TEXT,
  winner TEXT,
  game game_type NOT NULL DEFAULT 'cs2',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- RLS Policies: public read for all tables
CREATE POLICY "Anyone can read tournaments" ON public.tournaments FOR SELECT USING (true);
CREATE POLICY "Anyone can read teams" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Anyone can read players" ON public.players FOR SELECT USING (true);
CREATE POLICY "Anyone can read matches" ON public.matches FOR SELECT USING (true);
CREATE POLICY "Anyone can read events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Anyone can read user_roles" ON public.user_roles FOR SELECT TO authenticated USING (true);

-- Admin-only write policies
CREATE POLICY "Admins can insert tournaments" ON public.tournaments FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update tournaments" ON public.tournaments FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete tournaments" ON public.tournaments FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert teams" ON public.teams FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update teams" ON public.teams FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete teams" ON public.teams FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert players" ON public.players FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update players" ON public.players FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete players" ON public.players FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert matches" ON public.matches FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update matches" ON public.matches FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete matches" ON public.matches FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert events" ON public.events FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update events" ON public.events FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete events" ON public.events FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
CREATE TRIGGER update_tournaments_updated_at BEFORE UPDATE ON public.tournaments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON public.teams FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_players_updated_at BEFORE UPDATE ON public.players FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_matches_updated_at BEFORE UPDATE ON public.matches FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
