-- Public read avatars
CREATE POLICY "Public read avatars"
ON storage.objects
FOR SELECT
               USING (bucket_id = 'avatars');

-- Users can upload their own avatars
CREATE POLICY "Users can upload their own avatars"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'avatars'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can update their own avatars
CREATE POLICY "Users can update their own avatars"
ON storage.objects
FOR UPDATE
                      USING (
                      bucket_id = 'avatars'
                      AND (storage.foldername(name))[1] = auth.uid()::text
                      );

-- Users can delete their own avatars
CREATE POLICY "Users can delete their own avatars"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'avatars'
  AND (storage.foldername(name))[1] = auth.uid()::text
);
