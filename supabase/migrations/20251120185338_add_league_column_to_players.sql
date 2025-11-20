CREATE TYPE player_rank AS ENUM ('bronze', 'silver', 'gold');

ALTER TABLE players
ADD COLUMN league player_rank NOT NULL DEFAULT 'bronze';