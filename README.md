# WeatherView Application

A beautiful, responsive weather application that displays current weather conditions with intuitive visual scales.

## Features

- **Real-time Weather Data**: Get current weather conditions by entering a US zipcode
- **Visual Weather Scales**: Interactive 5-point scales for temperature, wind speed, and humidity
- **Temperature Conversion**: Toggle between Celsius and Fahrenheit with smooth animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Error Handling**: Comprehensive error messages for invalid inputs and API issues

## Setup Instructions

### 1. Get OpenWeatherMap API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to the API keys section in your account dashboard
4. Copy your API key

### 2. Configure Environment Variables

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and replace `your_api_key_here` with your actual OpenWeatherMap API key:
   ```
   VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

### 3. Install Dependencies and Run

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. Enter a valid US zipcode (e.g., 10001, 90210, 60601)
2. Click the search button or press Enter
3. View the weather data displayed on interactive visual scales
4. Use the temperature toggle to switch between Celsius and Fahrenheit
5. Each weather attribute shows its intensity through highlighted icons

## Weather Scales

### Temperature Scale
- **Very Cold**: Below 0°C (32°F) - Snowflake icon
- **Cold**: 0-10°C (32-50°F) - Cloud with snow icon
- **Mild**: 10-20°C (50-68°F) - Cloud icon
- **Warm**: 20-30°C (68-86°F) - Partial sun icon
- **Hot**: Above 30°C (86°F) - Full sun icon

### Wind Speed Scale
- **Calm**: 0-5 km/h - Leaf icon
- **Light Breeze**: 5-15 km/h - Wind icon
- **Moderate**: 15-30 km/h - Cloudy icon
- **Strong**: 30-50 km/h - Drizzle icon
- **Very Strong**: Above 50 km/h - Tornado icon

### Humidity Scale
- **Very Dry**: 0-20% - Sun icon
- **Dry**: 20-40% - Cloud icon
- **Moderate**: 40-60% - Clouds icon
- **Humid**: 60-80% - Rain icon
- **Very Humid**: Above 80% - Heavy rain icon

## Technologies Used

- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- OpenWeatherMap API for weather data
- Vite for development and building

## API Information

This application uses the OpenWeatherMap Current Weather Data API. The free tier includes:
- 1,000 API calls per day
- Current weather data
- 5-day weather forecast (not used in this app)

For more information, visit the [OpenWeatherMap API documentation](https://openweathermap.org/current).