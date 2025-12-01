CREATE TABLE IF NOT EXISTS donations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,

    amount INT NOT NULL,
    currency text DEFAULT 'usd',

    display_name TEXT,
    is_anonymous BOOLEAN DEFAULT FALSE,

    status TEXT DEFAULT 'pending' CHECK (status in ('pending', 'paid', 'failed')),

    payment_intent_id text UNIQUE,
    checkout_session_id text UNIQUE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );