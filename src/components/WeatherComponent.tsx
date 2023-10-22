import React, { useState, useEffect, useMemo } from 'react';
import { useUserLocation } from '../hooks/useUserLocation';
import { fetchWeather } from '../services/WeatherData';
import { WeatherIcon } from './WeatherIcon';
import { WeatherLoading } from './WeatherLoading';
import { IWeatherData, IPosition } from '../types';
import WMOWWCode from '../constants/WMOWWCode';

const WeekDay = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

interface IWeatherComponentProps {
  position?: IPosition;
}

export const WeatherComponent: React.FC<IWeatherComponentProps> = React.memo(
  ({ position }) => {
    const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
    const userLocation = useUserLocation();

    useEffect(() => {
      if (position) {
        fetchWeather(position).then((data) => setWeatherData(data));
        return;
      }
      if (userLocation) {
        fetchWeather(userLocation).then((data) => setWeatherData(data));
      }
    }, [position, userLocation]);

    const getRoundedTemperature = (temp?: number) =>
      temp ? Math.round(temp) : 0;

    const temperature = getRoundedTemperature(
      weatherData?.current_weather?.temperature
    );
    const maxTemperature = getRoundedTemperature(
      weatherData?.current_weather?.temperature_max ??
        weatherData?.daily?.temperature_2m_max[0]
    );
    const minTemperature = getRoundedTemperature(
      weatherData?.current_weather?.temperature_min ??
        weatherData?.daily?.temperature_2m_min[0]
    );
    const apparentTemperature = getRoundedTemperature(
      weatherData?.current_weather?.apparent_temperature ??
        weatherData?.hourly?.apparent_temperature[0]
    );
    const visibility = getRoundedTemperature(
      (weatherData?.hourly?.visibility[0] || 0) / 1000
    );
    const weathercode = weatherData?.current_weather?.weathercode ?? 0;
    const isDay = weatherData?.current_weather?.is_day ?? 1;
    const windSpeed = getRoundedTemperature(
      weatherData?.current_weather?.windspeed
    );
    const relativeHumidity =
      weatherData?.current_weather?.relativehumidity ??
      weatherData?.hourly?.relativehumidity_2m[0];
    const uvIndex = getRoundedTemperature(weatherData?.daily?.uv_index_max[0]);
    const latestDaysCodes = weatherData?.daily?.weathercode ?? [];
    const latestDaysPrecipitations =
      weatherData?.daily?.precipitation_probability_max ?? [];

    const latestDays = useMemo(() => {
      if (weatherData?.daily) {
        return weatherData.daily.time.map((time) =>
          WeekDay[new Date(time).getDay()].slice(0, 3)
        );
      }
      return [];
    }, [weatherData?.daily]);

    const latestDaysMaxTemperatures = useMemo(() => {
      if (weatherData?.daily) {
        return weatherData.daily.temperature_2m_max.map((temp) =>
          Math.round(temp)
        );
      }
      return [];
    }, [weatherData?.daily]);

    const latestDaysMinTemperatures = useMemo(() => {
      if (weatherData?.daily) {
        return weatherData.daily.temperature_2m_min.map((temp) =>
          Math.round(temp)
        );
      }
      return [];
    }, [weatherData?.daily]);

    const latestFiveHours = useMemo(() => {
      if (weatherData?.hourly) {
        const currentHour = new Date().getHours();
        return weatherData.hourly.time
          .slice(currentHour, currentHour + 5)
          .map((time) =>
            new Date(time).getHours() < 10
              ? `0${new Date(time).getHours()}`
              : new Date(time).getHours()
          );
      }
      return [];
    }, [weatherData?.hourly]);

    const latestFiveHoursTemperatues: number[] = useMemo(() => {
      if (weatherData?.hourly) {
        const currentHour = new Date().getHours();
        return weatherData.hourly.temperature_2m
          .slice(currentHour, currentHour + 5)
          .map((temp) => Math.round(temp));
      }
      return [];
    }, [weatherData?.hourly]);

    const latestFiveHoursCodes = useMemo(() => {
      if (weatherData?.hourly) {
        const currentHour = new Date().getHours();
        return weatherData.hourly.weathercode.slice(
          currentHour,
          currentHour + 5
        );
      }
      return [];
    }, [weatherData?.hourly]);

    return (
      <div className=''>
        {temperature ? (
          <div className='flex flex-col md:flex-row h-full md:space-x-6 space-y-6 md:space-y-0'>
            <div className='flex flex-col bg-white p-8 rounded-xl ring-8 ring-white ring-opacity-40 flex-grow'>
              <div className='flex justify-between'>
                <div className='flex flex-col'>
                  <span className='text-6xl font-bold'>{temperature}°C</span>
                </div>
                <div className='flex flex-col pt-2 pr-4 scale-150'>
                  {WeatherIcon(weathercode, !!isDay)}
                </div>
              </div>
              <div className='pt-2 justify-center items-center'>
                <p className='text-gray-500'>
                  Min: {minTemperature}°C - Max: {maxTemperature}°C
                </p>
              </div>
              <div className='pt-10'>
                <div className='flex justify-between text-gray-500'>
                  <span>FEELS LIKE:</span>
                  <span>{apparentTemperature} °C</span>
                </div>
                <div className='flex justify-between text-gray-500'>
                  <span>VISIBILITY:</span>
                  <span>{visibility} km</span>
                </div>
                <div className='flex justify-between text-gray-500'>
                  <span>HUMIDITY:</span>
                  <span>{relativeHumidity} %</span>
                </div>
                <div className='flex justify-between text-gray-500'>
                  <span>WIND:</span>
                  <span>{windSpeed} km/h</span>
                </div>
                <div className='flex justify-between text-gray-500'>
                  <span>UV:</span>
                  <span>{uvIndex}</span>
                </div>
              </div>
              <div className='flex gap-4 justify-between mt-12'>
                {latestFiveHoursCodes?.map((code, index) => (
                  <div key={index} className='flex flex-col items-center'>
                    <span className='font-semibold text-lg'>
                      {latestFiveHoursTemperatues[index]}°C
                    </span>
                    {WeatherIcon(code)}
                    <span className='font-semibold mt-1 text-sm'>
                      {latestFiveHours[index]}:00
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className='flex flex-col space-y-6 bg-white p-8 mt-10 md:mt-0 rounded-xl ring-8 ring-white ring-opacity-40 flex-grow'>
              {latestDays?.map((date, index) => (
                <div key={index} className='flex justify-between items-center'>
                  <span className='font-semibold text-lg w-16 pr-8'>
                    {date}
                  </span>
                  <div className='flex items-center justify-end w-16 pr-4'>
                    <span className='font-semibold'>
                      {latestDaysPrecipitations[index]}%
                    </span>
                  </div>
                  <div className='flex items-center justify-end w-16 pr-4'>
                    {latestDaysPrecipitations[index] >= 30
                      ? WeatherIcon(WMOWWCode.RAIN)
                      : WeatherIcon(latestDaysCodes[index])}
                  </div>
                  <span className='font-semibold text-lg w-24 text-right'>
                    {latestDaysMinTemperatures[index]}° -{' '}
                    {latestDaysMaxTemperatures[index]}°
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <WeatherLoading />
        )}
      </div>
    );
  }
);
