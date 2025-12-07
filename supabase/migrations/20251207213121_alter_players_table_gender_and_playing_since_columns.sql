CREATE TYPE gender_enum AS ENUM ('male', 'female');

UPDATE players
SET gender = 'male'
WHERE gender IS NULL
   OR gender NOT IN ('male', 'female');

ALTER TABLE players
    ALTER COLUMN gender DROP DEFAULT;

ALTER TABLE players
    ADD COLUMN gender_new gender_enum;

UPDATE players
SET gender_new = gender::gender_enum;

ALTER TABLE players
DROP COLUMN gender;

ALTER TABLE players
    RENAME COLUMN gender_new TO gender;

ALTER TABLE players
    ALTER COLUMN gender SET DEFAULT 'male';

ALTER TABLE players
ALTER COLUMN playing_since TYPE INT
    USING EXTRACT(YEAR FROM playing_since)::INT;