-- Blog posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  cover_image_url text,
  author text,
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS blog_posts_published_list_idx
  ON public.blog_posts (published, published_at DESC NULLS LAST);

CREATE OR REPLACE FUNCTION public.set_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.set_blog_posts_updated_at();

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS blog_posts_select_published ON public.blog_posts;
CREATE POLICY blog_posts_select_published ON public.blog_posts
  FOR SELECT
  USING (published = true);

DROP POLICY IF EXISTS blog_posts_insert_authenticated ON public.blog_posts;
CREATE POLICY blog_posts_insert_authenticated ON public.blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS blog_posts_update_authenticated ON public.blog_posts;
CREATE POLICY blog_posts_update_authenticated ON public.blog_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS blog_posts_delete_authenticated ON public.blog_posts;
CREATE POLICY blog_posts_delete_authenticated ON public.blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- Storage bucket for blog cover images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS blog_images_public_read ON storage.objects;
CREATE POLICY blog_images_public_read ON storage.objects
  FOR SELECT
  USING (bucket_id = 'blog-images');

DROP POLICY IF EXISTS blog_images_authenticated_insert ON storage.objects;
CREATE POLICY blog_images_authenticated_insert ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog-images');

DROP POLICY IF EXISTS blog_images_authenticated_update ON storage.objects;
CREATE POLICY blog_images_authenticated_update ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'blog-images');

DROP POLICY IF EXISTS blog_images_authenticated_delete ON storage.objects;
CREATE POLICY blog_images_authenticated_delete ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'blog-images');
