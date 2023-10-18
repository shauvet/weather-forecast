import React, { useState, useEffect } from 'react';
import { useUserLocation } from '../hooks/useUserLocation';
import { fetchWeather } from '../services/WeatherData';
import SunSvg from '../assets/sun.svg?react';
import CloudSvg from '../assets/cloud.svg?react';
import MoonSvg from '../assets/moon.svg?react';
import RainSvg from '../assets/rain.svg?react';

export const WeatherComponent: React.FC = () => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const userLocation = useUserLocation();

  useEffect(() => {
    if (userLocation) {
      fetchWeather(userLocation).then((data) => {
        setTemperature(data.hourly.temperature_2m[0]);
      });
    }
  }, [userLocation]);

  return (
    <div>
      {temperature ? (
        <div >
          <div className='w-full max-w-screen-sm bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40'>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <span className='text-6xl font-bold'>29°C</span>
                <span className='font-semibold mt-1 text-gray-500'>
                  Mudjimba, QLD
                </span>
              </div>
              <SunSvg />
            </div>
            <div className='flex justify-between mt-12'>
              <div className='flex flex-col items-center'>
                <span className='font-semibold text-lg'>29°C</span>
                <SunSvg />
                <span className='font-semibold mt-1 text-sm'>11:00</span>
                <span className='text-xs font-semibold text-gray-400'>AM</span>
              </div>
              <div className='flex flex-col items-center'>
                <span className='font-semibold text-lg'>31°C</span>
                <SunSvg />
                <span className='font-semibold mt-1 text-sm'>1:00</span>
                <span className='text-xs font-semibold text-gray-400'>PM</span>
              </div>
              <div className='flex flex-col items-center'>
                <span className='font-semibold text-lg'>32°C</span>
                <CloudSvg />
                <span className='font-semibold mt-1 text-sm'>3:00</span>
                <span className='text-xs font-semibold text-gray-400'>PM</span>
              </div>
              <div className='flex flex-col items-center'>
                <span className='font-semibold text-lg'>31°C</span>
                <CloudSvg />
                <span className='font-semibold mt-1 text-sm'>5:00</span>
                <span className='text-xs font-semibold text-gray-400'>PM</span>
              </div>
              <div className='flex flex-col items-center'>
                <span className='font-semibold text-lg'>27°C</span>
                <MoonSvg />
                <span className='font-semibold mt-1 text-sm'>7:00</span>
                <span className='text-xs font-semibold text-gray-400'>PM</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col space-y-6 w-full max-w-screen-sm bg-white p-10 mt-10 rounded-xl ring-8 ring-white ring-opacity-40'>
            <div className='flex justify-between items-center'>
              <span className='font-semibold text-lg w-1/4'>Fri, 22 Jan</span>
              <div className='flex items-center justify-end w-1/4 pr-10'>
                <span className='font-semibold'>12%</span>
                <RainSvg />
              </div>
              <SunSvg />
              <span className='font-semibold text-lg w-1/4 text-right'>
                18° / 32°
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='font-semibold text-lg w-1/4'>Sat, 23 Jan</span>
              <div className='flex items-center justify-end pr-10 w-1/4'>
                <span className='font-semibold'>0%</span>
                <RainSvg />
              </div>
              <SunSvg />
              <span className='font-semibold text-lg w-1/4 text-right'>
                22° / 34°
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='font-semibold text-lg w-1/4'>Sun, 24 Jan</span>
              <div className='flex items-center justify-end pr-10 w-1/4'>
                <span className='font-semibold'>20%</span>
                <RainSvg />
              </div>
              <SunSvg />
              <span className='font-semibold text-lg w-1/4 text-right'>
                21° / 32°
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='font-semibold text-lg w-1/4'>Mon, 25 Jan</span>
              <div className='flex items-center justify-end pr-10 w-1/4'>
                <span className='font-semibold'>50%</span>
                <RainSvg />
              </div>
              <CloudSvg />
              <span className='font-semibold text-lg w-1/4 text-right'>
                18° / 29°
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='font-semibold text-lg w-1/4'>Tue, 26 Jan</span>
              <div className='flex items-center justify-center w-1/4'>
                <span className='font-semibold'>80%</span>
                <RainSvg />
              </div>
              <CloudSvg />
              <span className='font-semibold text-lg w-1/4 text-right'>
                20° / 29°
              </span>
            </div>
          </div>
        </div>
      ) : (
        'Loading weather...'
      )}
    </div>
  );
};
