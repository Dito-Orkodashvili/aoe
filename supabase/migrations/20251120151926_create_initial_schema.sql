-- ===============================
--  PLAYERS
-- ===============================
CREATE TABLE players (
                         id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                         user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,

                         nickname text NOT NULL,
                         name text,
                         last_name text,
                         fav_civ text,
                         elo_official int,
                         elo_local int,
                         region text,
                         picture_url text,

                         created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_players_user_id ON players(user_id);


-- ===============================
--  MAPS (simple list of maps)
-- ===============================
CREATE TABLE maps (
                      id serial PRIMARY KEY,
                      name text UNIQUE NOT NULL,
                      status text NOT NULL CHECK (status IN ('open', 'semi-open', 'closed', 'water', 'hybrid')),
                      description text
);


-- ===============================
--  TOURNAMENTS
-- ===============================
CREATE TABLE tournaments (
                             id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

                             name text NOT NULL,
                             description text,
                             status text NOT NULL CHECK (status IN ('upcoming', 'ongoing', 'completed')),
                             type text CHECK (type IN ('1v1', 'team', 'ffa')),
                             organizer text,
                             prize_pool text,
                             participants_num_limit int,
                             start_date date,
                             end_date date,

                             created_at timestamptz DEFAULT now()
);


-- ===============================
--  TOURNAMENT PARTICIPANTS
-- ===============================
CREATE TABLE tournament_participants (
                                         id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

                                         tournament_id uuid NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
                                         player_id uuid NOT NULL REFERENCES players(id) ON DELETE CASCADE,
                                         seed int,
                                         joined_at timestamptz DEFAULT now(),

                                         UNIQUE (tournament_id, player_id)
);

CREATE INDEX idx_tournament_participants_tournament_id ON tournament_participants(tournament_id);
CREATE INDEX idx_tournament_participants_player_id ON tournament_participants(player_id);


-- ===============================
--  MATCHES
-- ===============================
CREATE TABLE matches (
                         id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

                         tournament_id uuid REFERENCES tournaments(id) ON DELETE CASCADE,

                         player1_id uuid REFERENCES players(id) ON DELETE SET NULL,
                         player2_id uuid REFERENCES players(id) ON DELETE SET NULL,

                         winner_id uuid REFERENCES players(id) ON DELETE SET NULL,
                         map_id int REFERENCES maps(id) ON DELETE SET NULL,

                         round text,
                         best_of int,
                         player1_score int DEFAULT 0,
                         player2_score int DEFAULT 0,

                         started_at timestamptz,
                         completed_at timestamptz
);

CREATE INDEX idx_matches_tournament_id ON matches(tournament_id);


-- ===============================
--  MATCH GAMES
--  For BO3 / BO5 details
-- ===============================
CREATE TABLE match_games (
                             id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

                             match_id uuid NOT NULL REFERENCES matches(id) ON DELETE CASCADE,

                             game_number int NOT NULL,
                             map_id int REFERENCES maps(id) ON DELETE SET NULL,
                             winner_id uuid REFERENCES players(id) ON DELETE SET NULL,

                             replay_url text
);

CREATE INDEX idx_match_games_match_id ON match_games(match_id);


-- ===============================
--  TOURNAMENT HISTORY
-- ===============================
CREATE TABLE tournament_history (
                                    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                                    tournament_id uuid REFERENCES tournaments(id) ON DELETE SET NULL,
                                    snapshot jsonb NOT NULL,
                                    created_at timestamptz DEFAULT now()
);
