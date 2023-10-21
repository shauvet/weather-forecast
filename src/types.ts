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
    temperature_max: number;
    temperature_min: number;
    relativehumidity: number;
    precipitation_probability: number;
    windspeed: number;
    apparent_temperature: number;
  };
  daily: {
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    uv_index_max: number[];
    time: string[];
  };
  hourly: {
    weathercode: number[];
    temperature_2m: number[];
    apparent_temperature: number[];
    relativehumidity_2m: number[];
    visibility: number[];
    time: string[];
  };
}
