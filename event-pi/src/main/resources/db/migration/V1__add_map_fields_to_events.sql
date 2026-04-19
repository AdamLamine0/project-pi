-- Add geocoding fields to the events table
-- All columns are nullable so existing rows are not affected
ALTER TABLE events
    ADD COLUMN IF NOT EXISTS address   VARCHAR(500)   NULL,
    ADD COLUMN IF NOT EXISTS latitude  DOUBLE         NULL,
    ADD COLUMN IF NOT EXISTS longitude DOUBLE         NULL;
