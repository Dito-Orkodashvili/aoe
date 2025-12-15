DROP TABLE IF EXISTS tournaments CASCADE;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tournament_status') THEN
        CREATE TYPE tournament_status AS ENUM (
          'draft',
          'registration',
          'upcoming',
          'active',
          'completed',
          'cancelled'
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tournament_visibility') THEN
        CREATE TYPE tournament_visibility AS ENUM (
          'public',
          'private',
          'unlisted'
        );
    END IF;
END$$;

CREATE TABLE tournaments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    cover_image_url TEXT,
    organizer TEXT,
    status tournament_status NOT NULL DEFAULT 'draft',
    visibility tournament_visibility NOT NULL DEFAULT 'public',
    stages_count INT NOT NULL DEFAULT 1 CHECK (stages_count IN (1, 2)),
    team_size INT NOT NULL DEFAULT 1,
    default_best_of INT NOT NULL DEFAULT 3,
    prize_pool INT,
    max_participants INT,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    registration_starts_at TIMESTAMPTZ,
    registration_ends_at TIMESTAMPTZ,
    is_registration_open BOOLEAN NOT NULL DEFAULT FALSE,
    config JSONB DEFAULT '{}'::jsonb,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tournaments_updated_at
BEFORE UPDATE ON tournaments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
