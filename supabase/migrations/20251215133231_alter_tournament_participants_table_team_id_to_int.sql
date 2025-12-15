ALTER TABLE tournament_participants
DROP COLUMN team_id;

ALTER TABLE tournament_participants
ADD COLUMN team_id SMALLINT
CHECK (team_id BETWEEN 1 AND 8);
