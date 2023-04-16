import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cities from '../json/cities.json';

const WeatherContext = React.createContext(); // Create the context

const WeatherProvider = ({ children }) => { // Weather context provider
  const [city, setCity] = useState(cities[33].name); // Default city
  const [weather, setWeather] = useState(null); // Weather data
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const API_KEY = ''; // Your API key


  const handleCitySelect = (event) => { // Handle city select
    const cityName = event.target.value;
    if (cityName) { // If a city is selected 
      setCity(cityName); // Set the city
    } else {
      setCity(''); // Set the city to empty
      setWeather(null); // Set the weather data to null
    }
  };
  
  useEffect(() => {
    const getWeatherData = () => { // Get weather data
      if (!city) { // If no city is selected
        return;   
      }

      setIsLoading(true); // Set loading state to true
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=en&cnt=7`) // Get weather data
        .then(response => { // If successful 
          setWeather(response.data); // Set the weather data
          setIsLoading(false); // Set loading state to false
        })
        .catch(error => { // If error
          console.log(error); // Log the error
          setIsLoading(false); // Set loading state to false
        });
    };

    getWeatherData(); // Call the function
  }, [city, API_KEY]); // Call the function when the city or API key changes

  const cityOptions = cities && cities.map(city => ( // Map the cities to options
    <option key={city.id} value={city.name}>{city.name}</option> // Return the options
  ));

  return ( // Return the context provider
    <WeatherContext.Provider value={{ city, weather, handleCitySelect, cityOptions, isLoading }}> 
      {children}  
    </WeatherContext.Provider> // Close the context provider
  );
};

export { WeatherProvider }; // Export the context provider
export default WeatherContext; // Export the context
