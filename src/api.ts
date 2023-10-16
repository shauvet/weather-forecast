// src/api.ts
import axios from 'axios';
import { WeatherData } from './types';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const PARAMETERS = '?latitude=51.5074&longitude=-0.1278&hourly=temperature_2m';

export const fetchWeather = async (): Promise<WeatherData | null> => {
  try {
    const response = await axios.get<WeatherData>(`${BASE_URL}${PARAMETERS}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};
