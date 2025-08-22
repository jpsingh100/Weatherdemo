import { createClient } from '@supabase/supabase-js';
import { WeatherData } from '../types/weather';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: ReturnType<typeof createClient> | null = null;

// Initialize Supabase client only if configuration is available
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

function ensureSupabaseConfigured() {
  if (!supabase) {
    throw new Error('Supabase configuration is missing. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
  }
  return supabase;
}

export interface WeatherQuery {
  id: string;
  zipcode: string;
  temperature_celsius: number;
  temperature_fahrenheit: number;
  wind_speed_kmh: number;
  humidity: number;
  description: string;
  city: string;
  country: string;
  created_at: string;
}

export class SupabaseService {
  /**
   * Save weather query data to the database
   */
  static async saveWeatherQuery(zipcode: string, weatherData: WeatherData): Promise<WeatherQuery> {
    const supabaseClient = ensureSupabaseConfigured();
    
    const { data, error } = await supabaseClient
      .from('weather_queries')
      .insert({
        zipcode,
        temperature_celsius: weatherData.temperature,
        temperature_fahrenheit: WeatherService.celsiusToFahrenheit(weatherData.temperature),
        wind_speed_kmh: weatherData.windSpeed,
        humidity: weatherData.humidity,
        description: weatherData.description,
        city: weatherData.city,
        country: weatherData.country
      })
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116' || error.message?.includes('Could not find the table')) {
        console.warn('Database table not found. Please run the SQL schema in your Supabase dashboard.');
        return; // Don't throw error, just log it
      }
      console.error('Error saving weather query:', error);
      throw new Error('Failed to save weather query to database');
    }

    return data;
  }

  /**
   * Get recent weather queries (last 10)
   */
  static async getRecentWeatherQueries(): Promise<WeatherQuery[]> {
    const supabaseClient = ensureSupabaseConfigured();
    
    const { data, error } = await supabaseClient
      .from('weather_queries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      if (error.code === 'PGRST116' || error.code === 'PGRST205' || error.message?.includes('Could not find the table')) {
        console.warn('Database table not found. Please run the SQL schema in your Supabase dashboard.');
        return []; // Return empty array instead of throwing error
      }
      console.error('Error fetching recent weather queries:', error);
      throw new Error('Failed to fetch recent weather queries');
    }

    return data || [];
  }

  /**
   * Get weather queries by zipcode
   */
  static async getWeatherQueriesByZipcode(zipcode: string): Promise<WeatherQuery[]> {
    const supabaseClient = ensureSupabaseConfigured();
    
    const { data, error } = await supabaseClient
      .from('weather_queries')
      .select('*')
      .eq('zipcode', zipcode)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching weather queries by zipcode:', error);
      throw new Error('Failed to fetch weather queries by zipcode');
    }

    return data || [];
  }

  /**
   * Get weather queries by city
   */
  static async getWeatherQueriesByCity(city: string): Promise<WeatherQuery[]> {
    const supabaseClient = ensureSupabaseConfigured();
    
    const { data, error } = await supabaseClient
      .from('weather_queries')
      .select('*')
      .ilike('city', `%${city}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching weather queries by city:', error);
      throw new Error('Failed to fetch weather queries by city');
    }

    return data || [];
  }

  /**
   * Delete a weather query by ID
   */
  static async deleteWeatherQuery(id: string): Promise<void> {
    const supabaseClient = ensureSupabaseConfigured();
    
    const { error } = await supabaseClient
      .from('weather_queries')
      .delete()
      .eq('id', id);

    if (error) {
      if (error.code === 'PGRST116' || error.message?.includes('Could not find the table')) {
        console.warn('Database table not found. Please run the SQL schema in your Supabase dashboard.');
        return; // Don't throw error, just log it
      }
      console.error('Error deleting weather query:', error);
      throw new Error('Failed to delete weather query');
    }
  }

  /**
   * Get weather statistics
   */
  static async getWeatherStats(): Promise<{
    totalQueries: number;
    uniqueZipcodes: number;
    averageTemperature: number;
    mostSearchedCity: string;
  }> {
    const supabaseClient = ensureSupabaseConfigured();
    
    // Get total queries
    const { count: totalQueries } = await supabaseClient
      .from('weather_queries')
      .select('*', { count: 'exact', head: true });

    // Get unique zipcodes count
    const { data: uniqueZipcodesData } = await supabaseClient
      .from('weather_queries')
      .select('zipcode')
      .order('zipcode');

    const uniqueZipcodes = new Set(uniqueZipcodesData?.map(q => q.zipcode)).size;

    // Get average temperature
    const { data: avgTempData } = await supabaseClient
      .from('weather_queries')
      .select('temperature_celsius');

    const averageTemperature = avgTempData && avgTempData.length > 0
      ? avgTempData.reduce((sum, q) => sum + q.temperature_celsius, 0) / avgTempData.length
      : 0;

    // Get most searched city
    const { data: cityData } = await supabaseClient
      .from('weather_queries')
      .select('city');

    const cityCounts = cityData?.reduce((acc, q) => {
      acc[q.city] = (acc[q.city] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    const mostSearchedCity = Object.entries(cityCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

    if (error) {
      if (error.code === 'PGRST116' || error.message?.includes('Could not find the table')) {
        console.warn('Database table not found. Please run the SQL schema in your Supabase dashboard.');
        return {
          totalQueries: 0,
          uniqueZipcodes: 0,
          averageTemperature: 0,
          mostSearchedCity: 'N/A'
        };
      }
      throw new Error(`Failed to fetch weather statistics`);
    }

    return {
      totalQueries: totalQueries || 0,
      uniqueZipcodes,
      averageTemperature: Math.round(averageTemperature),
      mostSearchedCity
    };
  }
}

// Import WeatherService for temperature conversion
import { WeatherService } from './weatherService';