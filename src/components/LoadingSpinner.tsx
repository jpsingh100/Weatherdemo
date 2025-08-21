import React from 'react';
import { Cloud } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <Cloud size={48} className="text-blue-600 animate-bounce" />
        <div className="absolute inset-0 bg-blue-600 rounded-full opacity-20 animate-ping"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Fetching weather data...</p>
    </div>
  );
};