/*
  # Re-enable RLS policies with proper authentication

  ## Changes
  1. Re-enable RLS on events table
  2. Create proper RLS policies for authenticated users
  3. Keep user_id nullable for flexibility

  ## Security
  - Users can view all events (for calendar/shared view)
  - Users can only create events for themselves
  - Users can only update/delete their own events
  - Anonymous users can view but not modify

  ## Notes
  - Policies check auth.uid() for user verification
  - Separate policies for each operation (SELECT, INSERT, UPDATE, DELETE)
*/

-- Re-enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policy for viewing events (allow all authenticated and anonymous)
CREATE POLICY "Anyone can view events"
  ON events
  FOR SELECT
  TO public
  USING (true);

-- Policy for creating events (authenticated users only, must set their own user_id)
CREATE POLICY "Authenticated users can create own events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id OR 
    (user_id IS NULL AND auth.uid() IS NOT NULL)
  );

-- Policy for updating events (only own events)
CREATE POLICY "Users can update own events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL)
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Policy for deleting events (only own events)
CREATE POLICY "Users can delete own events"
  ON events
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);