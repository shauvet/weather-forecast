import React, { useState, useEffect } from 'react';
import { useUserLocation } from '../hooks/useUserLocation';
import { fetchWeather } from '../services/WeatherData';

export const WeatherComponent: React.FC = () => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const userLocation = useUserLocation();

  useEffect(() => {
    if (userLocation) {
      fetchWeather(userLocation).then(data => {
        setTemperature(data.hourly.temperature_2m[0]);
      });
    }
  }, [userLocation]);

  return (
    <div>
      {temperature ? <div className="flex items-center justify-center min-h-screen p-4 sm:p-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl w-full sm:w-96 opacity-90">
                <h2 className="text-xl font-semibold mb-4 flex items-center justify-center sm:justify-start">
                    <svg className="h-6 w-6 mr-2 text-blue-500" /* Add your Cloud icon SVG path here */></svg>
                    Weather
                </h2>
                <p className="text-center sm:text-left text-gray-800">
                    <strong className="text-blue-500">Temperature:</strong> {temperature}°C
                </p>
            </div>
        </div> : "Loading weather..."}
    </div>
  );
};
