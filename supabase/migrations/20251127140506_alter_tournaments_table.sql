ALTER TABLE tournaments DROP CONSTRAINT IF EXISTS tournaments_status_check;
ALTER TABLE tournaments DROP CONSTRAINT IF EXISTS tournaments_type_check;

ALTER TABLE tournaments
    RENAME COLUMN participants_num_limit TO max_participants;

ALTER TABLE tournaments
    ADD CONSTRAINT tournaments_type_check CHECK (
        type IN ('single_stage', 'two_stage')
        );

ALTER TABLE tournaments
    ADD CONSTRAINT tournaments_status_check CHECK (
        status IN ('upcoming', 'ongoing', 'completed', 'archived')
        );

ALTER TABLE tournaments
    ADD COLUMN IF NOT EXISTS format TEXT,
    ADD COLUMN IF NOT EXISTS allow_multi_phase BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS match_format_default TEXT DEFAULT 'bo3',
    ADD COLUMN IF NOT EXISTS visibility TEXT DEFAULT 'public',
    ADD COLUMN IF NOT EXISTS cover_image_url TEXT,
    ADD COLUMN IF NOT EXISTS created_by UUID,
    ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
    ADD COLUMN IF NOT EXISTS config JSONB DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS registration_starts_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS registration_ends_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS is_registration_open BOOLEAN DEFAULT FALSE;

ALTER TABLE tournaments
    ADD CONSTRAINT tournaments_format_check CHECK (
        format IN (
            'single_elim',
            'double_elim',
            'round_robin',
            'swiss',
            'playoffs',
            'free_for_all'
        )
    );

ALTER TABLE tournaments
    ADD CONSTRAINT tournaments_visibility_check CHECK (
        visibility IN ('public', 'private', 'unlisted')
        );

ALTER TABLE tournaments
    ALTER COLUMN format SET DEFAULT 'single_elim';

ALTER TABLE tournaments
    ALTER COLUMN match_format_default SET DEFAULT 'bo3';

ALTER TABLE tournaments
    ALTER COLUMN visibility SET DEFAULT 'public';

ALTER TABLE tournaments
    ALTER COLUMN allow_multi_phase SET DEFAULT FALSE;

ALTER TABLE tournaments
    ALTER COLUMN is_registration_open SET DEFAULT FALSE;
