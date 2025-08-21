import React, { useState, useEffect } from 'react';
import { History, Trash2, Search, MapPin, Calendar, Thermometer, Wind, Droplets } from 'lucide-react';
import { WeatherQuery } from '../services/supabaseService';

interface WeatherHistoryProps {
  onSelectQuery: (zipcode: string) => void;
}

export const WeatherHistory: React.FC<WeatherHistoryProps> = ({ onSelectQuery }) => {
  const [queries, setQueries] = useState<WeatherQuery[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    totalQueries: number;
    uniqueZipcodes: number;
    averageTemperature: number;
    mostSearchedCity: string;
  } | null>(null);

  const loadHistory = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { SupabaseService } = await import('../services/supabaseService');
      const [recentQueries, weatherStats] = await Promise.all([
        SupabaseService.getRecentWeatherQueries(),
        SupabaseService.getWeatherStats()
      ]);
      
      setQueries(recentQueries);
      setStats(weatherStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weather history');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuery = async (id: string) => {
    try {
      const { SupabaseService } = await import('../services/supabaseService');
      await SupabaseService.deleteWeatherQuery(id);
      setQueries(queries.filter(q => q.id !== id));
    } catch (err) {
      console.error('Failed to delete query:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    loadHistory();
  }, []);

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <span className="ml-2 text-white">Loading history...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <div className="text-center">
          <p className="text-red-200 mb-4">{error}</p>
          <button
            onClick={loadHistory}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <History className="text-white" size={24} />
          <h2 className="text-xl font-semibold text-white">Weather History</h2>
        </div>
        <button
          onClick={loadHistory}
          className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
          title="Refresh history"
        >
          <Search size={20} />
        </button>
      </div>

      {/* Statistics */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <p className="text-blue-200 text-sm">Total Queries</p>
            <p className="text-white font-semibold text-lg">{stats.totalQueries}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <p className="text-blue-200 text-sm">Unique Zipcodes</p>
            <p className="text-white font-semibold text-lg">{stats.uniqueZipcodes}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <p className="text-blue-200 text-sm">Avg Temp (°C)</p>
            <p className="text-white font-semibold text-lg">{stats.averageTemperature}°</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <p className="text-blue-200 text-sm">Top City</p>
            <p className="text-white font-semibold text-lg truncate" title={stats.mostSearchedCity}>
              {stats.mostSearchedCity}
            </p>
          </div>
        </div>
      )}

      {/* History List */}
      {queries.length === 0 ? (
        <div className="text-center py-8">
          <History className="text-white/50 mx-auto mb-4" size={48} />
          <p className="text-white/80">No weather queries yet</p>
          <p className="text-white/60 text-sm">Search for weather to see your history here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {queries.map((query) => (
            <div
              key={query.id}
              className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => onSelectQuery(query.zipcode)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="text-blue-300" size={16} />
                    <span className="text-white font-medium">{query.city}, {query.country}</span>
                    <span className="text-blue-200 text-sm">({query.zipcode})</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Thermometer className="text-red-300" size={14} />
                      <span className="text-white">{query.temperature_celsius}°C</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Wind className="text-gray-300" size={14} />
                      <span className="text-white">{query.wind_speed_kmh} km/h</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Droplets className="text-blue-300" size={14} />
                      <span className="text-white">{query.humidity}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <Calendar className="text-gray-400" size={14} />
                    <span className="text-gray-300 text-xs">{formatDate(query.created_at)}</span>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-gray-300 text-xs capitalize">{query.description}</span>
                  </div>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteQuery(query.id);
                  }}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  title="Delete query"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
