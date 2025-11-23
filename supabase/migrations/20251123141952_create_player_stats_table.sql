CREATE TABLE IF NOT EXISTS player_stats (
                                            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    aoe_profile_id BIGINT,

    elo_1v1 INTEGER,
    elo_team INTEGER,
    games_played_1v1 INTEGER,
    games_played_team INTEGER,
    wins_1v1 INTEGER,
    wins_team INTEGER,
    win_streak_1v1 INTEGER,
    win_streak_team INTEGER,

    raw JSONB,

    last_sync TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

CREATE INDEX IF NOT EXISTS idx_player_stats_aoe_profile_id
    ON player_stats (aoe_profile_id);
