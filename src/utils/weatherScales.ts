import { WeatherScale } from '../types/weather';

export const getTemperatureScale = (temp: number, unit: 'celsius' | 'fahrenheit'): WeatherScale[] => {
  const tempInCelsius = unit === 'fahrenheit' ? (temp - 32) * 5/9 : temp;
  
  const scales: WeatherScale[] = [
    { value: 1, level: 1, icon: 'Snowflake', label: 'Very Cold', color: 'text-blue-600' },
    { value: 2, level: 2, icon: 'CloudSnow', label: 'Cold', color: 'text-blue-400' },
    { value: 3, level: 3, icon: 'Cloud', label: 'Mild', color: 'text-gray-500' },
    { value: 4, level: 4, icon: 'Sun', label: 'Warm', color: 'text-yellow-500' },
    { value: 5, level: 5, icon: 'Sun', label: 'Hot', color: 'text-red-500' }
  ];

  // Determine active scale based on temperature
  let activeLevel = 1;
  if (tempInCelsius >= 30) activeLevel = 5;
  else if (tempInCelsius >= 20) activeLevel = 4;
  else if (tempInCelsius >= 10) activeLevel = 3;
  else if (tempInCelsius >= 0) activeLevel = 2;
  else activeLevel = 1;

  return scales.map(scale => ({
    ...scale,
    active: scale.level === activeLevel
  }));
};

export const getWindSpeedScale = (windSpeed: number): WeatherScale[] => {
  const scales: WeatherScale[] = [
    { value: 1, level: 1, icon: 'Leaf', label: 'Calm', color: 'text-green-500' },
    { value: 2, level: 2, icon: 'Wind', label: 'Light Breeze', color: 'text-blue-400' },
    { value: 3, level: 3, icon: 'Cloud', label: 'Moderate', color: 'text-gray-500' },
    { value: 4, level: 4, icon: 'CloudDrizzle', label: 'Strong', color: 'text-orange-500' },
    { value: 5, level: 5, icon: 'Tornado', label: 'Very Strong', color: 'text-red-500' }
  ];

  // Determine active scale based on wind speed (km/h)
  let activeLevel = 1;
  if (windSpeed >= 50) activeLevel = 5;
  else if (windSpeed >= 30) activeLevel = 4;
  else if (windSpeed >= 15) activeLevel = 3;
  else if (windSpeed >= 5) activeLevel = 2;
  else activeLevel = 1;

  return scales.map(scale => ({
    ...scale,
    active: scale.level === activeLevel
  }));
};

export const getHumidityScale = (humidity: number): WeatherScale[] => {
  const scales: WeatherScale[] = [
    { value: 1, level: 1, icon: 'Sun', label: 'Very Dry', color: 'text-yellow-600' },
    { value: 2, level: 2, icon: 'Cloud', label: 'Dry', color: 'text-gray-400' },
    { value: 3, level: 3, icon: 'Clouds', label: 'Moderate', color: 'text-blue-400' },
    { value: 4, level: 4, icon: 'CloudRain', label: 'Humid', color: 'text-blue-600' },
    { value: 5, level: 5, icon: 'CloudRainWind', label: 'Very Humid', color: 'text-blue-800' }
  ];

  // Determine active scale based on humidity percentage
  let activeLevel = 1;
  if (humidity >= 80) activeLevel = 5;
  else if (humidity >= 60) activeLevel = 4;
  else if (humidity >= 40) activeLevel = 3;
  else if (humidity >= 20) activeLevel = 2;
  else activeLevel = 1;

  return scales.map(scale => ({
    ...scale,
    active: scale.level === activeLevel
  }));
};