# Quick Setup Guide

## Step 1: Environment Variables

Create a `.env` file in the root directory with the following content:

```env
# Weather API Configuration
# Get your API key from: https://openweathermap.org/api
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here

# Supabase Configuration
# Get these from your Supabase project settings > API
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Step 2: Supabase Setup

1. Go to [Supabase](https://supabase.com) and create a new project
2. Once your project is created, go to the **SQL Editor**
3. Copy and paste the contents of `supabase-schema.sql` into the editor
4. Run the SQL to create the database schema
5. Go to **Settings** > **API** to get your project URL and anon key
6. Update your `.env` file with the actual values

## Step 3: OpenWeatherMap API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from your account dashboard
4. Update your `.env` file with the API key

## Step 4: Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Troubleshooting

- Make sure all environment variables are set correctly
- Verify your Supabase project is active and the schema has been created
- Check that your OpenWeatherMap API key is valid
- Ensure you're using valid US zipcodes (5 digits)
