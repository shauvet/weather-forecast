// WeatherLoading.tsx

export const WeatherLoading: React.FC = () => {
  return (
    <div className="weather-loading flex items-center justify-center h-screen bg-blue-200 relative overflow-hidden">
      <div className="sun w-12 h-12 bg-yellow-500 rounded-full absolute top-1/3 left-1/3"></div>
      <div className="cloud w-24 h-14 bg-gray-200 rounded-full absolute top-1/2 left-1/2"></div>
    </div>
  );
};
