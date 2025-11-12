-- Create payment_attempts table for tracking failed payment attempts
CREATE TABLE IF NOT EXISTS payment_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID,
  user_id UUID NOT NULL,
  stripe_payment_intent_id TEXT,
  error_code TEXT NOT NULL,
  error_type TEXT NOT NULL,
  error_message TEXT NOT NULL,
  raw_stripe_error JSONB NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd',
  card_last4 TEXT,
  card_brand TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_payment_attempts_goal_id ON payment_attempts(goal_id);
CREATE INDEX IF NOT EXISTS idx_payment_attempts_user_id ON payment_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_attempts_stripe_payment_intent_id ON payment_attempts(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_payment_attempts_error_type ON payment_attempts(error_type);
CREATE INDEX IF NOT EXISTS idx_payment_attempts_created_at ON payment_attempts(created_at DESC);

-- Enable Row Level Security
ALTER TABLE payment_attempts ENABLE ROW LEVEL SECURITY;

-- Users can view their own payment attempts
CREATE POLICY "Users can view own payment attempts"
  ON payment_attempts FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can insert payment attempts
CREATE POLICY "Service can insert payment attempts"
  ON payment_attempts FOR INSERT
  WITH CHECK (true);

-- Create or replace updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_payment_attempts_updated_at
  BEFORE UPDATE ON payment_attempts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comment on table
COMMENT ON TABLE payment_attempts IS 'Tracks failed payment attempts with categorized error information';
