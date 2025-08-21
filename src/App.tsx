import React, { useState } from 'react';
import { Cloud, History } from 'lucide-react';
import { WeatherData, TemperatureUnit } from './types/weather';
import { WeatherService } from './services/weatherService';
import { WeatherInput } from './components/WeatherInput';
import { WeatherDisplay } from './components/WeatherDisplay';
import { TemperatureToggle } from './components/TemperatureToggle';
import { LoadingSpinner } from './components/LoadingSpinner';
import { WeatherHistory } from './components/WeatherHistory';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('celsius');
  const [showHistory, setShowHistory] = useState(false);

  const handleSearch = async (zipcode: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await WeatherService.getWeatherByZipcode(zipcode);
      setWeatherData(data);
      
      // Save to database
      try {
        const { SupabaseService } = await import('./services/supabaseService');
        await SupabaseService.saveWeatherQuery(zipcode, data);
      } catch (dbError) {
        console.error('Failed to save to database:', dbError);
        // Don't show error to user for database issues, just log it
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleTemperatureToggle = (unit: TemperatureUnit) => {
    setTemperatureUnit(unit);
  };

  const handleHistorySelect = (zipcode: string) => {
    setShowHistory(false);
    handleSearch(zipcode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Cloud size={40} className="text-white" />
            <h1 className="text-4xl font-bold text-white">WeatherView</h1>
          </div>
          <p className="text-blue-100 text-lg">
            Discover detailed weather conditions with beautiful visual scales
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-8">
          <WeatherInput
            onSearch={handleSearch}
            loading={loading}
            error={error}
          />
        </div>

        {/* History Toggle Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
          >
            <History size={20} />
            <span>{showHistory ? 'Hide History' : 'Show History'}</span>
          </button>
        </div>

        {/* History Panel */}
        {showHistory && (
          <div className="mb-8">
            <WeatherHistory onSelectQuery={handleHistorySelect} />
          </div>
        )}

        {/* Temperature Toggle */}
        {weatherData && (
          <TemperatureToggle
            unit={temperatureUnit}
            onToggle={handleTemperatureToggle}
          />
        )}

        {/* Content Area */}
        <div className="flex justify-center">
          {loading && <LoadingSpinner />}
          
          {weatherData && !loading && (
            <WeatherDisplay
              weatherData={weatherData}
              temperatureUnit={temperatureUnit}
            />
          )}
          
          {!weatherData && !loading && !error && (
            <div className="text-center py-12">
              <Cloud size={64} className="text-white/50 mx-auto mb-4" />
              <p className="text-white/80 text-lg">
                Enter a zipcode above to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;