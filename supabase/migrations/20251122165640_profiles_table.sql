-- Create profiles table
CREATE TABLE public.profiles (
                                 id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
                                 full_name TEXT,
                                 avatar_url TEXT,
                                 created_at TIMESTAMPTZ DEFAULT NOW(),
                                 updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own profile
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- Make profiles publicly readable (remove if you want private profiles)
CREATE POLICY "Public profiles are readable"
ON public.profiles
FOR SELECT
USING (TRUE);

-- Create function to insert profile on user signup
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

-- Trigger to auto-create profile
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE PROCEDURE public.handle_new_user();
