ALTER TABLE player_stats
ALTER COLUMN aoe_profile_id TYPE TEXT
USING aoe_profile_id::text;

ALTER TABLE players
ADD CONSTRAINT players_aoe_profile_id_unique UNIQUE (aoe_profile_id);

ALTER TABLE player_stats
ADD CONSTRAINT fk_player_stats_profile
FOREIGN KEY (aoe_profile_id)
REFERENCES players(aoe_profile_id)
ON DELETE CASCADE;