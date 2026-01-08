CREATE TYPE difficulty_enum AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE map_type AS ENUM ('open', 'semi_open', 'closed', 'hybrid', 'water');

CREATE TABLE BUILD_ORDERS (
    id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,

    description TEXT,
    difficulty difficulty_enum NOT NULL,
    opening_type TEXT,
    strategy_type TEXT,
    map_type map_type NOT NULL,
    maps BIGINT[] DEFAULT '{}',
    youtube_url TEXT,

    civilization_ids INT[] NOT NULL,

    feudal_click_pop INT,

    author_id UUID NOT NULL
        REFERENCES auth.users(id)
            ON DELETE CASCADE,

    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);