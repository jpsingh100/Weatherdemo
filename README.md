# WeatherView - Weather App with Supabase Integration

A beautiful weather application that displays detailed weather conditions with visual scales and saves all weather queries to a Supabase database for history tracking.

## Features

- 🌤️ **Real-time Weather Data**: Get current weather conditions by zipcode
- 📊 **Visual Weather Scales**: Beautiful visual representations of temperature, wind, and humidity
- 🌡️ **Temperature Unit Toggle**: Switch between Celsius and Fahrenheit
- 📝 **Weather History**: View and manage your previous weather queries
- 📈 **Statistics Dashboard**: See usage statistics and trends
- 💾 **Database Integration**: All queries are automatically saved to Supabase
- 🎨 **Modern UI**: Beautiful gradient design with Tailwind CSS

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Weather API**: OpenWeatherMap

## Prerequisites

- Node.js (v16 or higher)
- A Supabase account
- An OpenWeatherMap API key

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd WeatherDemo
npm install
```

### 2. Set Up Supabase

1. Go to [Supabase](https://supabase.com) and create a new project
2. Once your project is created, go to the **SQL Editor**
3. Copy and paste the contents of `supabase-schema.sql` into the editor
4. Run the SQL to create the database schema
5. Go to **Settings** > **API** to get your project URL and anon key

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Get OpenWeatherMap API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from your account dashboard
4. Add it to your `.env` file

### 5. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Database Schema

The application uses a single table `weather_queries` with the following structure:

```sql
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
```

## Features in Detail

### Weather History
- View all your previous weather queries
- Click on any history item to re-search that location
- Delete individual queries
- See statistics including total queries, unique zipcodes, average temperature, and most searched city

### Visual Weather Scales
- Temperature scale with color-coded ranges
- Wind speed scale with descriptive labels
- Humidity scale with visual indicators

### Database Operations
- **Automatic Saving**: Every weather query is automatically saved to the database
- **History Retrieval**: Load recent queries with statistics
- **Search by Zipcode**: Find all queries for a specific zipcode
- **Search by City**: Find all queries for a specific city
- **Delete Operations**: Remove individual queries from history

## API Endpoints Used

The application uses the following Supabase operations:

- `INSERT` - Save new weather queries
- `SELECT` - Retrieve weather history and statistics
- `DELETE` - Remove queries from history
- `COUNT` - Calculate statistics

## Security Considerations

- Row Level Security (RLS) is enabled on the `weather_queries` table
- For demo purposes, all operations are allowed
- In production, consider implementing user authentication and proper RLS policies

## Troubleshooting

### Common Issues

1. **"Weather API key is not configured"**
   - Make sure you've added `VITE_OPENWEATHER_API_KEY` to your `.env` file
   - Verify your API key is correct

2. **"Supabase configuration is missing"**
   - Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are in your `.env` file
   - Check that your Supabase project is active

3. **"Invalid zipcode"**
   - Make sure you're using a valid 5-digit US zipcode
   - The OpenWeatherMap API only supports US zipcodes

4. **Database connection errors**
   - Verify your Supabase project is running
   - Check that you've run the schema SQL in your Supabase SQL Editor
   - Ensure your anon key has the correct permissions

### Environment Variables Checklist

Make sure your `.env` file contains:

```env
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.