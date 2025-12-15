CREATE TABLE tournament_group_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stage_id UUID NOT NULL REFERENCES tournament_stages(id) ON DELETE CASCADE,
    participant_id UUID NOT NULL REFERENCES tournament_participants(id) ON DELETE CASCADE,
    group_number INT NOT NULL
);