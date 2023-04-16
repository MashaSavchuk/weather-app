import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState(null);

  function displayWeather(response) {
    setLoaded(true);
    // setTemperature(response.data.main.temp);
    console.log(response.data);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
    console.log(response.data);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // alert(city);
    //get access to city
    //haave on API call
    //update weather UI
    let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    // console.log(apiUrl);
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Enter a city..."
          onChange={updateCity}
        />
        <button type="submit">Search</button>
      </form>
      <p>
        This project was coded by Mariia Savchuk and is
        <a
          href="https://github.com/MashaSavchuk/weather-app-react"
          target="_blank"
          rel="noreferrer"
        >
          open-sourced on GitHub
        </a>
        and hosted on
        <a
          href="https://aesthetic-salamander-f2e005.netlify.app/"
          target="_blank"
          rel="noreferrer"
        >
          Netlify
        </a>
      </p>
    </div>
  );

  if (loaded) {
    // return "Loaded...";
    // temperature;
    return (
      <div>
        {form}
        <ul>
          <li>Temperature {Math.round(weather.temperature)}C</li>
          <li>Humidity {weather.humidity}%</li>
          <li>Wind {weather.wind} km/h</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
