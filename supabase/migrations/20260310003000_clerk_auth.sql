-- Migration: Update 'businesses' table to support Clerk Authentication
-- Clerk user IDs are strings (e.g., 'user_2xyz...'), not UUIDs.
-- We must alter the 'owner_id' column to type TEXT.

-- Drop existing RLS policies that depend on owner_id being a UUID
DROP POLICY IF EXISTS "Users can view own businesses" ON businesses;
DROP POLICY IF EXISTS "Users can insert own businesses" ON businesses;
DROP POLICY IF EXISTS "Users can update own businesses" ON businesses;
DROP POLICY IF EXISTS "Users can delete own businesses" ON businesses;

DROP POLICY IF EXISTS "Users can view own communications" ON communications;

-- Alter the column type safely
ALTER TABLE businesses ALTER COLUMN owner_id TYPE text;

-- Recreate policies using the new text type, mapped to Clerk's auth.user_id() convention if using JWTs later,
-- but since our Next.js API uses the 'postgres' service role, the SQL backend queries will handle the auth scope directly.

-- For future frontend usage, assuming a custom claim 'sub' holds the user_id
CREATE POLICY "Users can view own businesses"
  ON businesses FOR SELECT
  USING (auth.uid()::text = owner_id);

CREATE POLICY "Users can insert own businesses"
  ON businesses FOR INSERT
  WITH CHECK (auth.uid()::text = owner_id);

CREATE POLICY "Users can update own businesses"
  ON businesses FOR UPDATE
  USING (auth.uid()::text = owner_id);

CREATE POLICY "Users can delete own businesses"
  ON businesses FOR DELETE
  USING (auth.uid()::text = owner_id);

CREATE POLICY "Users can view own communications"
  ON communications FOR SELECT
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE owner_id = auth.uid()::text
    )
  );
