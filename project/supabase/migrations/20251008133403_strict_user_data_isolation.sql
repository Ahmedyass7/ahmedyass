/*
  # Strict User Data Isolation

  ## Overview
  This migration ensures complete data isolation between user accounts.
  Each user can ONLY see and manage their own events.

  ## Changes
  1. Drop all existing RLS policies
  2. Make user_id NOT NULL again
  3. Create strict RLS policies that enforce user data separation
  4. Each user has their own isolated data space

  ## Security
  - Users can ONLY view their own events
  - Users can ONLY create events for themselves
  - Users can ONLY update their own events
  - Users can ONLY delete their own events
  - No cross-user data access possible

  ## Notes
  - This is production-ready security
  - Google OAuth users will have their own isolated data
  - Email/password users will have their own isolated data
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "Anyone can view events" ON events;
DROP POLICY IF EXISTS "Authenticated users can create own events" ON events;
DROP POLICY IF EXISTS "Users can update own events" ON events;
DROP POLICY IF EXISTS "Users can delete own events" ON events;

-- Make user_id required and set default to current user
ALTER TABLE events ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE events ALTER COLUMN user_id SET DEFAULT auth.uid();

-- Ensure RLS is enabled
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policy for SELECT: Users can only view their own events
CREATE POLICY "Users can view only their own events"
  ON events
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for INSERT: Users can only create events for themselves
CREATE POLICY "Users can create only their own events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for UPDATE: Users can only update their own events
CREATE POLICY "Users can update only their own events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for DELETE: Users can only delete their own events
CREATE POLICY "Users can delete only their own events"
  ON events
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index on user_id for better query performance
CREATE INDEX IF NOT EXISTS idx_events_user_id_start_date 
  ON events(user_id, start_date);

-- Add comment to table
COMMENT ON TABLE events IS 'Events table with strict per-user data isolation. Each user can only access their own events.';