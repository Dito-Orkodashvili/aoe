CREATE TYPE age_enum AS ENUM ('dark', 'feudal', 'castle', 'imperial');

CREATE TABLE BUILD_ORDER_STEPS (
    id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),

    build_order_id UUID NOT NULL
        REFERENCES BUILD_ORDERS(ID)
            ON DELETE CASCADE,

    step_number INT NOT NULL,
    age age_enum NOT NULL,

    villager_count INT,
    population INT,

    food_vils INT DEFAULT 0,
    wood_vils INT DEFAULT 0,
    gold_vils INT DEFAULT 0,
    stone_vils INT DEFAULT 0,

    task TEXT NOT NULL,
    note TEXT,
    icon TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE (build_order_id, step_number)
);