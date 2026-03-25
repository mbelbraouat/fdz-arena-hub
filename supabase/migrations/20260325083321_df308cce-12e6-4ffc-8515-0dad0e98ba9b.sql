
-- Registrations table for tournament signups
CREATE TABLE public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID REFERENCES public.tournaments(id) ON DELETE CASCADE NOT NULL,
  team_name TEXT NOT NULL,
  team_tag TEXT NOT NULL,
  captain_name TEXT NOT NULL,
  captain_email TEXT NOT NULL,
  players JSONB NOT NULL DEFAULT '[]'::jsonb,
  game public.game_type NOT NULL DEFAULT 'cs2',
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Anyone can read registrations (public listing)
CREATE POLICY "Anyone can read registrations" ON public.registrations FOR SELECT TO public USING (true);

-- Anyone can insert registrations (public signup)
CREATE POLICY "Anyone can insert registrations" ON public.registrations FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Admins can update registrations
CREATE POLICY "Admins can update registrations" ON public.registrations FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete registrations
CREATE POLICY "Admins can delete registrations" ON public.registrations FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Add updated_at trigger
CREATE TRIGGER update_registrations_updated_at BEFORE UPDATE ON public.registrations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
