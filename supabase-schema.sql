-- Weather Demo Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Create a table to store weather queries
CREATE TABLE weather_queries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  zipcode VARCHAR(10) NOT NULL,
  temperature_celsius DECIMAL(5,2) NOT NULL,
  temperature_fahrenheit DECIMAL(5,2) NOT NULL,
  wind_speed_kmh DECIMAL(5,2) NOT NULL,
  humidity INTEGER NOT NULL,
  description TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(3) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create an index on zipcode for faster lookups
CREATE INDEX idx_weather_queries_zipcode ON weather_queries(zipcode);

-- Create an index on created_at for time-based queries
CREATE INDEX idx_weather_queries_created_at ON weather_queries(created_at);

-- Add RLS (Row Level Security) policy to allow all operations for now
-- In production, you might want to restrict this based on user authentication
ALTER TABLE weather_queries ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (for demo purposes)
CREATE POLICY "Allow all operations on weather_queries" ON weather_queries
  FOR ALL USING (true);

-- Optional: Create a function to get weather statistics
CREATE OR REPLACE FUNCTION get_weather_stats()
RETURNS TABLE (
  total_queries BIGINT,
  unique_zipcodes BIGINT,
  average_temperature DECIMAL(5,2),
  most_searched_city TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT as total_queries,
    COUNT(DISTINCT zipcode)::BIGINT as unique_zipcodes,
    AVG(temperature_celsius) as average_temperature,
    (SELECT city 
     FROM weather_queries 
     GROUP BY city 
     ORDER BY COUNT(*) DESC 
     LIMIT 1) as most_searched_city
  FROM weather_queries;
END;
$$ LANGUAGE plpgsql;
