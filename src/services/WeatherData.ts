import { IPosition, IWeatherData } from '../types';

export const fetchWeather = async (
  coords: IPosition
): Promise<IWeatherData> => {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&hourly=temperature_2m`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
