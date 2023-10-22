import { FC, useCallback } from 'react';
import { AsyncSelect } from './AsyncSelect';
import { GEO_API_URL } from '../api';

interface CityData {
  latitude: number;
  longitude: number;
  name: string;
  countryCode: string;
}

interface SearchBarProps {
  onSearchChange: (searchData: { value: string; label: string } | null) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearchChange }) => {
  const loadOptions = useCallback(async (inputValue: string) => {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY || '',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        },
      }
    );
    const responseData = await response.json();
    if (Array.isArray(responseData.data)) {
      return responseData.data.map((city: CityData) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      }));
    }
    return [];
  }, []);

  const handleOnChange = (
    searchData: { value: string; label: string } | null
  ) => {
    onSearchChange(searchData);
  };

  return (
    <div className='w-full fixed top-0 left-0 flex flex-col md:flex-row items-center justify-between bg-black text-white p-5 z-10'>
      <div className='mb-4 md:mb-0 md:w-1/2 flex items-center justify-center'>
        <p className='text-2xl'>Today's Weather</p>
      </div>
      <div className='w-full md:w-1/2 flex justify-center md:justify-start'>
        <AsyncSelect
          placeholder='Search for city'
          debounceTimeout={600}
          onChange={handleOnChange}
          loadOptions={loadOptions}
          className='w-full md:w-1/2 mx-auto md:mx-0 text-black text-xl'
        />
      </div>
    </div>
  );
};

export default SearchBar;
