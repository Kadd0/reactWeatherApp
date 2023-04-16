import React from 'react';
import { WeatherProvider } from './context/WeatherContext';
import Weather from './components/Weather';
import './App.css';
function App() {
  return (
    <div>
      <h1>Weather App</h1>
      <WeatherProvider>
        <Weather />
      </WeatherProvider>
    </div>
  );
}

export default App;
