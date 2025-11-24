ALTER TABLE players
ADD COLUMN steam_id TEXT,
ADD CONSTRAINT players_steam_id_key UNIQUE (steam_id);