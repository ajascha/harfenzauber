-- Enable Row Level Security on posts tables
ALTER TABLE "hfz_posts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "posts" ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON "hfz_posts";
DROP POLICY IF EXISTS "Allow authenticated insert" ON "hfz_posts";
DROP POLICY IF EXISTS "Allow authenticated update" ON "hfz_posts";
DROP POLICY IF EXISTS "Allow authenticated delete" ON "hfz_posts";

DROP POLICY IF EXISTS "Allow public read access" ON "posts";
DROP POLICY IF EXISTS "Allow authenticated insert" ON "posts";
DROP POLICY IF EXISTS "Allow authenticated update" ON "posts";
DROP POLICY IF EXISTS "Allow authenticated delete" ON "posts";

-- Policy: Allow public read access to hfz_posts
CREATE POLICY "Allow public read access" ON "hfz_posts"
  FOR SELECT
  USING (true);

-- Policy: Allow authenticated users to insert hfz_posts records
CREATE POLICY "Allow authenticated insert" ON "hfz_posts"
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users to update hfz_posts records
CREATE POLICY "Allow authenticated update" ON "hfz_posts"
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Allow authenticated users to delete hfz_posts records
CREATE POLICY "Allow authenticated delete" ON "hfz_posts"
  FOR DELETE
  TO authenticated
  USING (true);

-- Policy: Allow public read access to posts
CREATE POLICY "Allow public read access" ON "posts"
  FOR SELECT
  USING (true);

-- Policy: Allow authenticated users to insert posts records
CREATE POLICY "Allow authenticated insert" ON "posts"
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users to update posts records
CREATE POLICY "Allow authenticated update" ON "posts"
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Allow authenticated users to delete posts records
CREATE POLICY "Allow authenticated delete" ON "posts"
  FOR DELETE
  TO authenticated
  USING (true);

