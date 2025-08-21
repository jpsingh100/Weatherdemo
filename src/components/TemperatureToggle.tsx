import React from 'react';
import { Thermometer } from 'lucide-react';
import { TemperatureUnit } from '../types/weather';

interface TemperatureToggleProps {
  unit: TemperatureUnit;
  onToggle: (unit: TemperatureUnit) => void;
}

export const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ unit, onToggle }) => {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-lg">
        <div className="flex items-center space-x-1">
          <Thermometer size={16} className="text-gray-600 ml-2" />
          <button
            onClick={() => onToggle('celsius')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              unit === 'celsius'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            °C
          </button>
          <button
            onClick={() => onToggle('fahrenheit')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              unit === 'fahrenheit'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            °F
          </button>
        </div>
      </div>
    </div>
  );
};