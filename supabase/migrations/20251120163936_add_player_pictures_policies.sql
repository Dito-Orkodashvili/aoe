-- ===============================================================
-- STORAGE RLS POLICIES FOR player_pictures
-- Public read, admin/service-role only write
-- ===============================================================

-- Public can read player pictures
CREATE POLICY "Public read player pictures"
ON storage.objects
FOR SELECT
               USING (bucket_id = 'player_pictures');

-- Only service-role (admin backend) can upload player pictures
CREATE POLICY "Admins can upload player pictures"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'player_pictures'
  AND auth.role() = 'service_role'
);

-- Only service-role can update player pictures
CREATE POLICY "Admins can update player pictures"
ON storage.objects
FOR UPDATE
                      USING (
                      bucket_id = 'player_pictures'
                      AND auth.role() = 'service_role'
                      );

-- Only service-role can delete player pictures
CREATE POLICY "Admins can delete player pictures"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'player_pictures'
  AND auth.role() = 'service_role'
);
