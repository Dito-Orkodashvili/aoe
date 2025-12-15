DROP TABLE IF EXISTS tournament_stage_results CASCADE;

CREATE TABLE tournament_stage_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stage_id UUID NOT NULL REFERENCES tournament_stages(id) ON DELETE CASCADE,
    participant_id UUID NOT NULL REFERENCES tournament_participants(id) ON DELETE CASCADE,
    rank INT,
    points INT,
    wins INT,
    losses INT,
    score_diff INT,
    extra JSONB DEFAULT '{}'::jsonb, -- flexible field for anything
    advanced BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_result_per_stage UNIQUE (stage_id, participant_id)
);

CREATE TRIGGER update_tournament_stage_results_updated_at
BEFORE UPDATE ON tournament_stage_results
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
