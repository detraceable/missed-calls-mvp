-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_communications_phones_status 
ON communications (business_phone, customer_phone, status);

-- Distributed Rate Limiting Table
CREATE TABLE IF NOT EXISTS rate_limits (
  ip_address text PRIMARY KEY,
  request_count integer NOT NULL DEFAULT 1,
  reset_at timestamptz NOT NULL
);

-- Secure rate_limits table (only API routes use service role)
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
