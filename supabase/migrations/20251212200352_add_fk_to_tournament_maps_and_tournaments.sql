ALTER TABLE tournament_maps
ADD CONSTRAINT tournament_maps_tournament_id_fkey
FOREIGN KEY (tournament_id)
REFERENCES tournaments(id)
ON DELETE CASCADE;