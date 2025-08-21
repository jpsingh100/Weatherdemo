import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface WeatherInputProps {
  onSearch: (zipcode: string) => void;
  loading: boolean;
  error: string | null;
}

export const WeatherInput: React.FC<WeatherInputProps> = ({ onSearch, loading, error }) => {
  const [zipcode, setZipcode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipcode.trim() && !loading) {
      onSearch(zipcode.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 5) {
      setZipcode(value);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={zipcode}
            onChange={handleInputChange}
            placeholder="Enter zipcode (e.g., 10001)"
            className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
              error 
                ? 'border-red-300 focus:border-red-500 bg-red-50' 
                : 'border-gray-200 focus:border-blue-500 bg-white/80 backdrop-blur-sm'
            }`}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!zipcode.trim() || loading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg bg-blue-600 text-white transition-all duration-300 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Search size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </form>
      
      {error && (
        <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
      
      <div className="mt-2 text-center">
        <p className="text-sm text-gray-600">
          Enter a US zipcode to get current weather conditions
        </p>
      </div>
    </div>
  );
};