import { useState, useEffect } from 'react';
import { IPosition } from '../types';

export const useUserLocation = (): IPosition | null => {
  const [location, setLocation] = useState<IPosition | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  return location;
};
