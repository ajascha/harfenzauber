-- Enable Row Level Security on pricing table
ALTER TABLE "pricing" ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (idempotent)
DROP POLICY IF EXISTS "Allow public read access" ON "pricing";
DROP POLICY IF EXISTS "Allow authenticated insert" ON "pricing";
DROP POLICY IF EXISTS "Allow authenticated update" ON "pricing";

-- Policy: Allow public read access to pricing
CREATE POLICY "Allow public read access" ON "pricing"
  FOR SELECT
  USING (true);

-- Policy: Allow authenticated users to insert pricing records
CREATE POLICY "Allow authenticated insert" ON "pricing"
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users to update pricing records
CREATE POLICY "Allow authenticated update" ON "pricing"
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

