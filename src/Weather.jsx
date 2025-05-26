// import React, { useState } from 'react';
// import './App.css';

// function Weather() {
//   const [city, setCity] = useState('');
//   const [result, setResult] = useState('');
//   const [icon, setIcon] = useState('');
  
//   const changeHandler = (e) => {
//     setCity(e.target.value);
//   };

//   const getIcon = (main) => {
//     const icons = {
//       Clear: '/icons/icons8-partly-cloudy-day-48.png',
//       Clouds: '/icons/icons8-clouds-48.png',
//       Rain: '/icons/icons8-cloud-48.png',
//       Thunderstorm: '/icons/icons8-cloud-lightning-48.png',
//       Snow: '/icons/icons8-night-48.png',
//       Mist: '/icons/icons8-night-wind-48.png',
//       Haze: '/icons/icons8-night-wind-48.png',
//       Smoke: '/icons/icons8-night-wind-48.png',
//       Fog: '/icons/icons8-night-wind-48.png',
//     };
//     return icons[main] || '/icons/icons8-clouds-48.png';
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     if (city === '') {
//       setResult("Please enter a city");
//       setIcon('');
//       return;
//     }
//     try {
//       const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`
//       );
//       const data = await response.json();

//       if (data.cod !== 200) {
//         setResult("City not found");
//         setIcon('');
//         return;
//       }

//       const kelvin = data.main.temp;
//       const celsius = kelvin - 273.15;
//       setResult(`Temperature in ${city} is ${Math.round(celsius)}°C`);
//       setIcon(getIcon(data.weather[0].main));
//     } catch (error) {
//       setResult("Error fetching data");
//       setIcon('');
//     }
//   };

//   return (
//     <div className="container">
//       <div className="weather-card">
//         <h1 className="title">Weather App</h1>
//         <form onSubmit={submitHandler} className="search-form">
//           <input
//             type="text"
//             placeholder="Enter city..."
//             value={city}
//             onChange={changeHandler}
//             className="search-input"
//           />
//           <button type="submit" className="search-button">
//             <img src="/icons/icons8-search-50.png" alt="search" />
//           </button>
//         </form>
//         {icon && <img src={icon} alt="weather icon" className="weather-icon" />}
//         <h2 className="result">{result}</h2>
//       </div>
//     </div>
//   );
// }

// export default Weather;

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState("");

  const getWeather = async () => {
    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const kelvinTemp = data.main.temp;
      const celsiusTemp = kelvinTemp - 273.15;

      setTemperature(Math.round(celsiusTemp));
      setWindSpeed(data.wind.speed);
      setHumidity(data.main.humidity);
      setWeatherCondition(data.weather[0].main);
    } catch (error) {
      alert("City not found");
      setTemperature(null);
      setWindSpeed(null);
      setHumidity(null);
      setWeatherCondition("");
    }
  };

  const getIconForCondition = (condition) => {
    switch (condition) {
      case "Clouds":
        return "/icons/icons8-clouds-48.png";
      case "Clear":
        return "/icons/icons8-night-48.png";
      case "Rain":
        return "/icons/icons8-cloud-lightning-48.png";
      case "Thunderstorm":
        return "/icons/icons8-cloud-lightning-48.png";
      case "Drizzle":
        return "/icons/icons8-partly-cloudy-day-48.png";
      case "Mist":
      case "Fog":
        return "/icons/icons8-night-wind-48.png";
      default:
        return "/icons/icons8-cloud-48.png";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-cyan-300">
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl p-8 w-[350px] text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">🌤️ Weather App</h1>
        <div className="flex items-center justify-center mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="border border-gray-300 rounded-l px-4 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={getWeather}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
          >
            <FaSearch />
          </button>
        </div>

        {temperature !== null && (
          <div className="space-y-4">
            <img
              src={getIconForCondition(weatherCondition)}
              alt={weatherCondition}
              className="mx-auto w-16"
            />
            <p className="text-lg font-medium text-gray-700">
              Temperature in <span className="font-bold">{city}</span> is{" "}
              <span className="text-blue-600 font-bold">{temperature}°C</span>
            </p>
            <p className="text-gray-700">
              💨 Wind Speed: <span className="font-bold">{windSpeed} m/s</span>
            </p>
            <p className="text-gray-700">
              💧 Humidity: <span className="font-bold">{humidity}%</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;

