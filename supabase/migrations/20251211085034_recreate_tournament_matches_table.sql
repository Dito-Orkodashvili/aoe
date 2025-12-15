DO $$
BEGIN
  IF NOT EXISTS (
      SELECT 1 FROM pg_type WHERE typname = 'tournament_match_status'
  ) THEN
CREATE TYPE tournament_match_status AS ENUM (
      'pending',
      'scheduled',
      'in_progress',
      'completed',
      'forfeit',
      'bye'
    );
END IF;
END$$;

DROP TABLE IF EXISTS matches CASCADE;

CREATE TABLE tournament_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stage_id UUID NOT NULL REFERENCES tournament_stages(id) ON DELETE CASCADE,
    round INT NOT NULL,
    match_number INT NOT NULL,
    participant1_id UUID REFERENCES tournament_participants(id) ON DELETE SET NULL,
    participant2_id UUID REFERENCES tournament_participants(id) ON DELETE SET NULL,
    winner_id UUID REFERENCES tournament_participants(id) ON DELETE SET NULL,
    score_p1 INT,
    score_p2 INT,
    best_of INT NOT NULL DEFAULT 3,
    status tournament_match_status NOT NULL DEFAULT 'pending',
    scheduled_at TIMESTAMPTZ,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    next_match_id UUID REFERENCES tournament_matches(id) ON DELETE SET NULL,
    next_match_slot INT CHECK (next_match_slot IN (1, 2)),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_tournament_matches_updated_at
BEFORE UPDATE ON tournament_matches
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
