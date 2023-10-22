// src/App.tsx
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import { WeatherComponent } from './components/WeatherComponent';
import { IPosition } from './types';
import './index.css';

interface Option {
  value: string;
  label: string;
}

const Home: React.FC = () => {
  const [position, setPosition] = useState<IPosition>();

  const handleOnSearchChange = (searchData: Option | null) => {
    if (searchData !== null) {
      const [lat, lon] = searchData.value.split(' ');
      setPosition({ latitude: Number(lat), longitude: Number(lon) });
    }
  };

  return (
    <div className='flex flex-col items-center justify-center w-screen min-h-screen text-gray-700 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 pt-40 md:pt-0'>
      <SearchBar onSearchChange={handleOnSearchChange} />
      <WeatherComponent position={position} />
    </div>
  );
};

export default Home;
