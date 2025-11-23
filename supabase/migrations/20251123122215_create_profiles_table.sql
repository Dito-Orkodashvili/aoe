CREATE TYPE user_role AS ENUM ('user', 'admin');

CREATE TABLE public.profiles (
                                 id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
                                 avatar_url TEXT,
                                 role user_role NOT NULL DEFAULT 'user',
                                 created_at TIMESTAMPTZ DEFAULT NOW(),
                                 updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
                 USING (auth.uid() = id);

CREATE POLICY "Public profile readable"
ON public.profiles
FOR SELECT
USING (TRUE);

CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
INSERT INTO public.profiles (id)
VALUES (NEW.id);
RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE PROCEDURE public.handle_new_user();
