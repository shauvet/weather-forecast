import { IPosition, IWeatherData } from '../types';

const currenTypes = [
  'weathercode',
  'is_day',
  'temperature_2m',
  'temperature_2m_max',
  'temperature_2m_min',
  'relativehumidity_2m',
  'precipitation_probability',
  'windspeed_10m',
  'winddirection_10m',
];

const dailyTypes = [
  'weathercode',
  'temperature_2m_max',
  'temperature_2m_min',
  'precipitation_probability_max',
];

const hourlyTypes = ['weathercode', 'temperature_2m'];

export const fetchWeather = async (
  coords: IPosition
): Promise<IWeatherData> => {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${
    coords.latitude
  }&longitude=${
    coords.longitude
  }&current=${currenTypes.join()}&daily=${dailyTypes.join()}&hourly=${hourlyTypes.join()}&timezone=Asia%2FTokyo&current_weather=true`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
