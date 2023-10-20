import React, { useState, useEffect, useMemo } from 'react';
import { useUserLocation } from '../hooks/useUserLocation';
import { fetchWeather } from '../services/WeatherData';
import WMOWWCode from '../constants/WMOWWCode';
import * as WeatherIcons from '../components/WeatherIcons';
import { IPosition, IWeatherData } from '../types';

export const WeatherComponent: React.FC = () => {
  const [current, setCurrent] = useState<IWeatherData["current_weather"] | null>(null);
  const [daily, setDaily] = useState<IWeatherData["daily"] | null>(null);
  const [hourly, setHourly] = useState<IWeatherData["hourly"] | null>(null);
  const userLocation = useUserLocation();

  const temperature = useMemo(() => {
    if (current) {
      return Math.round(current.temperature);
    }
    return null;
  }, [current]);

  const latestDays = useMemo(() => {
    if (daily) {
      return daily.time.map((time) => (new Date(time).getDate() < 10 ? `0${new Date(time).getDate()}` : new Date(time).getDate()));
    }
    return [];
  }, [daily]);

  const latestDaysCodes = useMemo(() => {
    if (daily) {
      return daily.weathercode;
    }
    return [];
  }, [daily]);

  const latestDaysPrecipitations = useMemo(() => {
    if (daily) {
      return daily.precipitation_probability_max;
    }
    return [];
  }, [daily]);

  const latestDaysMaxTemperatures = useMemo(() => {
    if (daily) {
      return daily.temperature_2m_max.map((temp) => Math.round(temp));
    }
    return [];
  }, [daily]);

  const latestDaysMinTemperatures = useMemo(() => {
    if (daily) {
      return daily.temperature_2m_min.map((temp) => Math.round(temp));
    }
    return [];
  }, [daily]);

  const latestFiveHours = useMemo(() => {
    if (hourly) {
      const currentHour = new Date().getHours();
      return hourly.time.slice(currentHour, currentHour + 5).map((time) => (new Date(time).getHours() < 10 ? `0${new Date(time).getHours()}` : new Date(time).getHours()));
    }
    return [];
  }, [hourly]);

  const latestFiveHoursTemperatues:number[] = useMemo(() => {
    if (hourly) {
      const currentHour = new Date().getHours();
      return hourly.temperature_2m.slice(currentHour, currentHour + 5).map((temp) => Math.round(temp));
    }
    return [];
  }, [hourly]);

  const latestFiveHoursCodes = useMemo(() => {
    if (hourly) {
      const currentHour = new Date().getHours();
      return hourly.weathercode.slice(currentHour, currentHour + 5);
    }
    return [];
  }, [hourly]);

  type WeatherIconComponent = React.ReactElement | null;

  const WeatherIcon = (weatherCode: WMOWWCode): WeatherIconComponent => {
    switch (weatherCode) {
      case WMOWWCode.CLEAR:
        return <WeatherIcons.ClearSkyIcon />;
      case WMOWWCode.RAIN:
        return <WeatherIcons.RainIcon />;
      case WMOWWCode.CLOUDS_DISSOLVING:
      case WMOWWCode.CLOUDS_FORMING:
      case WMOWWCode.CLOUD_DEVELOPMENT_NOT_OBSERVED:
        return <WeatherIcons.CloudIcon />;
      default:
        return <WeatherIcons.MoonIcon />;
    }
  };

  useEffect(() => {
    if (userLocation) {
      
      fetchWeather(userLocation).then((data) => {
        setCurrent(data.current_weather);
        setDaily(data.daily);
        setHourly(data.hourly);
      });
    }
  }, [userLocation]);

  return (
    <div>
      {temperature ? (
        <div>
          <div className='w-full max-w-screen-sm bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40'>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <span className='text-6xl font-bold'>{temperature}°C</span>
                <span className='font-semibold mt-1 text-gray-500'>Tokyo</span>
              </div>
            </div>
            <div className='flex justify-between mt-12'>
              {latestFiveHoursCodes?.map((code, index) => (
                <div className='flex flex-col items-center'>
                <span className='font-semibold text-lg'>{latestFiveHoursTemperatues[index]}°C</span>
                {WeatherIcon(code)}
                <span className='font-semibold mt-1 text-sm'>{latestFiveHours[index]}:00</span>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col space-y-6 w-full max-w-screen-sm bg-white p-10 mt-10 rounded-xl ring-8 ring-white ring-opacity-40'>
            {latestDays?.map((date, index) => <div className='flex justify-between items-center'>
              <span className='font-semibold text-lg w-1/4'>{date}日</span>
              <div className='flex items-center justify-end w-1/4 pr-10'>
                <span className='font-semibold'>{latestDaysPrecipitations[index]}%</span>
              </div>
              {WeatherIcon(latestDaysCodes[index])}
              <span className='font-semibold text-lg w-1/4 text-right'>
                {latestDaysMinTemperatures[index]}° / {latestDaysMaxTemperatures[index]}°
              </span>
            </div>)}
          </div>
        </div>
      ) : (
        'Loading weather...'
      )}
    </div>
  );
};
