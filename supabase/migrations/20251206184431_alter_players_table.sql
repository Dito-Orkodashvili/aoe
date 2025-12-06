ALTER TABLE players
DROP COLUMN elo_official;

ALTER TABLE players
RENAME COLUMN elo_local TO tournament_elo;

ALTER TABLE players
  ADD COLUMN youtube text,
  ADD COLUMN twitch text,
  ADD COLUMN gender text CHECK (gender IN ('male', 'female', 'other')),
  ADD COLUMN playing_since date,
  ADD COLUMN team text,
  ADD COLUMN bio text;
