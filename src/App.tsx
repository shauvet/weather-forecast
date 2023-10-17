// src/App.tsx
import React from 'react';
import { WeatherComponent } from "./components/WeatherComponent";
import './index.css';

const App: React.FC = () => {
    return (
      <div className="App">
        <WeatherComponent />
        </div>
    );
}

export default App;
