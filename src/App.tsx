// src/App.tsx
import React, { useEffect, useState } from 'react';
import { fetchWeather } from './api';
import { WeatherData } from './types';
import './index.css';  

const App: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchWeather();
            if (data) setWeatherData(data);
        };

        loadData();
    }, []);

    if (!weatherData) return <p className="text-center mt-4">Loading...</p>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-8">
            <div className="bg-white p-4 sm:p-8 rounded-xl shadow-md w-full sm:w-96">
                <h2 className="text-xl font-semibold mb-4 flex items-center justify-center sm:justify-start">
                    <svg className="h-6 w-6 mr-2 text-gray-500" /* Add your Cloud icon SVG path here */></svg>
                    Weather
                </h2>
                <p className="text-center sm:text-left"><strong>Temperature:</strong> {weatherData.hourly.temperature_2m[0]}°C</p>
            </div>
        </div>
    );
}

export default App;
