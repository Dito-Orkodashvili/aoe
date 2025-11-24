ALTER TABLE IF EXISTS player_stats DROP CONSTRAINT IF EXISTS fk_player_stats_profile;

DROP INDEX IF EXISTS idx_player_stats_aoe_profile_id;

DROP TABLE IF EXISTS player_stats;