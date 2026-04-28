-- Add role to players (for coach/sub/main roster distinction)
ALTER TABLE public.players ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'main';

-- Add logo_url to registrations for team logo during signup
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS logo_url TEXT;