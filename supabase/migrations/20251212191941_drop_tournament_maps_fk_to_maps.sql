BEGIN;

ALTER TABLE tournament_maps
DROP CONSTRAINT IF EXISTS tournament_maps_map_id_fkey;

DROP TABLE IF EXISTS maps CASCADE;

COMMIT;
