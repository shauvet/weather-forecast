// src/types.ts
interface HourlyForecast {
  temperature_2m: number[];
  // You can add more fields based on the API response
}

export interface WeatherData {
  hourly: HourlyForecast;
}
