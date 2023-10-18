// src/App.tsx
import React from 'react';
import { WeatherComponent } from "./components/WeatherComponent";
import './index.css';

const App: React.FC = () => {
    return (
      <div className="flex flex-col items-center justify-center w-screen min-h-screen text-gray-700 p-10 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 ">
        <WeatherComponent />
        </div>
    );
}

export default App;
