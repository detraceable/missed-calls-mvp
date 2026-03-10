-- Migration for strictly Next.js API Routes using `postgres`
-- Note: API routes use service role which bypasses RLS. Policies apply to future anon-key frontend usage.

CREATE TABLE IF NOT EXISTS businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid,
  name text,
  twilio_number text UNIQUE,
  forwarding_number text,
  is_active boolean DEFAULT true,
  default_system_prompt text DEFAULT 'You are a helpful AI assistant for our business. Keep responses friendly, short, and to the point.',
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text DEFAULT 'trialing',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS communications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE,
  business_phone text,
  customer_phone text,
  status text DEFAULT 'open',
  trigger_source text,
  system_prompt text,
  message_history jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;

-- Owner scoped policies for future frontend integration
CREATE POLICY "Users can view own businesses"
  ON businesses FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert own businesses"
  ON businesses FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own businesses"
  ON businesses FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete own businesses"
  ON businesses FOR DELETE
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can view own communications"
  ON communications FOR SELECT
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE owner_id = auth.uid()
    )
  );

-- Auto-update trigger for communications table
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON communications
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
