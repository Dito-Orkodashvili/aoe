ALTER TABLE player_stats
ADD CONSTRAINT player_stats_aoe_profile_id_unique UNIQUE (aoe_profile_id);
