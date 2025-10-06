/*
  # Create Events Management System

  ## Overview
  This migration creates a comprehensive events management system with reminders and calendar functionality.

  ## New Tables
  
  ### events
  - `id` (uuid, primary key) - Unique identifier for each event
  - `title` (text, required) - Event title
  - `description` (text, optional) - Event description
  - `start_date` (timestamptz, required) - Event start date and time
  - `end_date` (timestamptz, optional) - Event end date and time
  - `location` (text, optional) - Event location
  - `reminder_minutes` (integer, default: 30) - Minutes before event to show reminder
  - `is_completed` (boolean, default: false) - Whether event is completed
  - `user_id` (uuid, required) - Reference to auth.users
  - `created_at` (timestamptz) - Timestamp when event was created
  - `updated_at` (timestamptz) - Timestamp when event was last updated

  ## Security
  
  ### Row Level Security (RLS)
  - Enable RLS on events table
  - Users can only view their own events
  - Users can only create events for themselves
  - Users can only update their own events
  - Users can only delete their own events

  ## Notes
  1. All timestamps use timestamptz for timezone awareness
  2. reminder_minutes allows flexible reminder timing
  3. is_completed helps track event status
  4. Proper indexing on user_id and start_date for performance
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  start_date timestamptz NOT NULL,
  end_date timestamptz,
  location text DEFAULT '',
  reminder_minutes integer DEFAULT 30,
  is_completed boolean DEFAULT false,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policies for SELECT
CREATE POLICY "Users can view own events"
  ON events
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for INSERT
CREATE POLICY "Users can create own events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policies for UPDATE
CREATE POLICY "Users can update own events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policies for DELETE
CREATE POLICY "Users can delete own events"
  ON events
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_events_user_id ON events(user_id);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
CREATE INDEX IF NOT EXISTS idx_events_is_completed ON events(is_completed);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_events_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS events_updated_at ON events;
CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_events_updated_at();