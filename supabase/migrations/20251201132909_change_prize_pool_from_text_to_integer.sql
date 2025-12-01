ALTER TABLE tournaments
ALTER COLUMN prize_pool TYPE INTEGER
USING prize_pool::INTEGER;
