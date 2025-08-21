export interface WeatherData {
  temperature: number;
  windSpeed: number;
  humidity: number;
  description: string;
  city: string;
  country: string;
}

export interface WeatherApiResponse {
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    description: string;
    main: string;
  }>;
  name: string;
  sys: {
    country: string;
  };
}

export interface WeatherScale {
  value: number;
  level: number;
  icon: string;
  label: string;
  color: string;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';