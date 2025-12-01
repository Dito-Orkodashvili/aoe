CREATE TABLE IF NOT EXISTS tournament_maps (
                                               id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    tournament_id UUID NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
    map_id INT NOT NULL REFERENCES maps(id) ON DELETE CASCADE,

    map_order INT,
    is_enabled BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT NOW()
    );

CREATE INDEX IF NOT EXISTS idx_tournament_maps_tournament_id
    ON tournament_maps(tournament_id);

CREATE INDEX IF NOT EXISTS idx_tournament_maps_map_id
    ON tournament_maps(map_id);
