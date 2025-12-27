CREATE TABLE build_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,

    civs BIGINT[] DEFAULT '{}',
    opening_type TEXT,
    strategy_type TEXT,
    difficulty TEXT,
    patch_version TEXT,
    map_type TEXT,
    maps BIGINT[] DEFAULT '{}',
    youtube_url TEXT,
    author_id UUID NOT NULL
                   REFERENCES auth.users(id)
                   ON DELETE CASCADE,
    steps JSONB NOT NULL,
    feudal_click_pop INT,

    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);
