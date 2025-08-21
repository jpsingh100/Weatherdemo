import { WeatherApiResponse, WeatherData } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export class WeatherService {
  static async getWeatherByZipcode(zipcode: string): Promise<WeatherData> {
    if (!API_KEY) {
      throw new Error('Weather API key is not configured. Please add VITE_OPENWEATHER_API_KEY to your .env file.');
    }

    const url = `${BASE_URL}?zip=${zipcode}&appid=${API_KEY}&units=metric`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Invalid zipcode. Please check and try again.');
        } else if (response.status === 401) {
          throw new Error('Invalid API key. Please check your configuration.');
        } else {
          throw new Error('Weather service is temporarily unavailable. Please try again later.');
        }
      }

      const data: WeatherApiResponse = await response.json();
      
      return {
        temperature: Math.round(data.main.temp),
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        humidity: data.main.humidity,
        description: data.weather[0].description,
        city: data.name,
        country: data.sys.country
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch weather data. Please check your internet connection.');
    }
  }

  static celsiusToFahrenheit(celsius: number): number {
    return Math.round((celsius * 9/5) + 32);
  }

  static fahrenheitToCelsius(fahrenheit: number): number {
    return Math.round((fahrenheit - 32) * 5/9);
  }
}