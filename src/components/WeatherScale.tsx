import React from 'react';
import { Snowflake, CloudSnow, Cloud, Cloud as Clouds, Sun, Leaf, Wind, CloudDrizzle, Tornado, CloudRain, CloudRainWind } from 'lucide-react';
import { WeatherScale } from '../types/weather';

const LucideIconMap = {
  Snowflake,
  CloudSnow,
  Cloud,
  Clouds,
  Sun,
  Leaf,
  Wind,
  CloudDrizzle,
  Tornado,
  CloudRain,
  CloudRainWind
};

interface WeatherScaleProps {
  title: string;
  value: number;
  unit: string;
  scales: WeatherScale[];
}

export const WeatherScaleComponent: React.FC<WeatherScaleProps> = ({
  title,
  value,
  unit,
  scales
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="text-3xl font-bold text-gray-900 mb-4">
        {value}{unit}
      </div>
      
      <div className="flex justify-between items-center space-x-2">
        {scales.map((scale) => {
          const IconComponent = LucideIconMap[scale.icon as keyof typeof LucideIconMap];
          const isActive = scales.find(s => s.active)?.level === scale.level;
          
          return (
            <div
              key={scale.level}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-blue-100 scale-110 shadow-md' 
                  : 'hover:bg-gray-50 opacity-60 hover:opacity-80'
              }`}
            >
              <IconComponent
                size={24}
                className={`${isActive ? scale.color : 'text-gray-400'} transition-colors duration-300`}
              />
              <span className={`text-xs mt-1 font-medium ${
                isActive ? 'text-gray-800' : 'text-gray-500'
              }`}>
                {scale.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};