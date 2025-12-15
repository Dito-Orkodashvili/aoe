
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tournament_stage_format') THEN
        CREATE TYPE tournament_stage_format AS ENUM (
              'groups',
              'single_elimination',
              'double_elimination',
              'swiss',
              'round_robin',
              'showmatch'
            );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tournament_stage_status') THEN
        CREATE TYPE tournament_stage_status AS ENUM (
              'pending',
              'active',
              'completed'
            );
    END IF;
END$$;

CREATE TABLE tournament_stages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tournament_id UUID NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
    stage_number INT NOT NULL,
    format tournament_stage_format NOT NULL,
    status tournament_stage_status NOT NULL DEFAULT 'pending',
    config JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT unique_stage_per_tournament UNIQUE (tournament_id, stage_number)
);

CREATE TRIGGER update_tournament_stages_updated_at
BEFORE UPDATE ON tournament_stages
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
