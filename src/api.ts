// src/api.ts
import axios from 'axios';
import { WeatherData } from './types';

export const fetchWeather = async (): Promise<WeatherData | null> => {
  try {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: 51.5074,
        longitude: -0.1278,
        hourly: 'temperature_2m',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data: ', error);
    throw error;
  }
};
