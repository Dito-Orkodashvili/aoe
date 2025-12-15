DROP TABLE IF EXISTS match_games CASCADE;

CREATE TABLE tournament_match_games (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID NOT NULL REFERENCES tournament_matches(id) ON DELETE CASCADE,
    game_number INT NOT NULL,
    winner_id UUID REFERENCES tournament_participants(id) ON DELETE SET NULL,
    map_id INT,
    player1_civ_id INT,
    player2_civ_id INT,
    duration_seconds INT,
    replay_url TEXT,
    youtube_url TEXT,
    twitch_url TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_game_per_match UNIQUE (match_id, game_number)
);
