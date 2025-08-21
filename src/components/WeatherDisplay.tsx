import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { WeatherData, TemperatureUnit } from '../types/weather';
import { WeatherScaleComponent } from './WeatherScale';
import { getTemperatureScale, getWindSpeedScale, getHumidityScale } from '../utils/weatherScales';
import { WeatherService } from '../services/weatherService';

interface WeatherDisplayProps {
  weatherData: WeatherData;
  temperatureUnit: TemperatureUnit;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ 
  weatherData, 
  temperatureUnit 
}) => {
  const displayTemp = temperatureUnit === 'fahrenheit' 
    ? WeatherService.celsiusToFahrenheit(weatherData.temperature)
    : weatherData.temperature;

  const tempUnit = temperatureUnit === 'fahrenheit' ? '°F' : '°C';
  
  const temperatureScales = getTemperatureScale(displayTemp, temperatureUnit);
  const windSpeedScales = getWindSpeedScale(weatherData.windSpeed);
  const humidityScales = getHumidityScale(weatherData.humidity);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MapPin className="text-blue-600" size={24} />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {weatherData.city}, {weatherData.country}
              </h2>
              <p className="text-gray-600 capitalize">{weatherData.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <Calendar size={16} />
            <span className="text-sm">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Weather Scales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WeatherScaleComponent
          title="Temperature"
          value={displayTemp}
          unit={tempUnit}
          scales={temperatureScales}
        />
        
        <WeatherScaleComponent
          title="Wind Speed"
          value={weatherData.windSpeed}
          unit=" km/h"
          scales={windSpeedScales}
        />
        
        <WeatherScaleComponent
          title="Humidity"
          value={weatherData.humidity}
          unit="%"
          scales={humidityScales}
        />
      </div>
    </div>
  );
};