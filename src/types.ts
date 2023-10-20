// src/types.ts

export interface IPosition {
  latitude: number;
  longitude: number;
}

export interface IWeatherData {
  current_weather: {
    weathercode: number;
    is_day: string;
    temperature: number;
    temperature_2m_max: number;
    temperature_2m_min: number;
    relativehumidity_2m: number;
    precipitation_probability: number;
    windspeed_10m: number;
    winddirection_10m: number;
  };
  daily: {
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    time: string[];
  };
  hourly: {
    weathercode: number[];
    temperature_2m: number[];
    time: string[];
  };
}
