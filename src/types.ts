// src/types.ts

export interface IPosition {
  latitude: number;
  longitude: number;
}

export interface IWeatherData {
  hourly: {
    temperature_2m: number[];
  };
}
