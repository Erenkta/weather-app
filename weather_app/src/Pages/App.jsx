/* eslint-disable no-unused-vars */
import "./App.css";
import React, { useEffect, useState } from "react";
import { api_key } from "../api/api";
import clear_img from "../assets/images/clear.png";
import cloud_img from "../assets/images/cloud.png";
import drizzle_img from "../assets/images/drizzle.png";
import rain_img from "../assets/images/rain.png";
import snow_img from "../assets/images/snow.png";

import humidity_img from "../assets/images/humidity.png";
import wind_img from "../assets/images/wind.png";
export default function App() {
  const [humidity, setHumidity] = useState();
  const [wind, setWind] = useState();
  const [temp, setTemp] = useState();
  const [location, setLocation] = useState();
  const [weatherIcon, setWeatherIcon] = useState();

  useEffect(() => {
    search();
  }, []);

  const returnApi = (city) => {
    let base_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
    return base_url;
  };

  const search = async () => {
    const input = document.getElementById("searchbar");
    let value = input.value;
    if (value === "") {
      value = "Istanbul";
    }
    let url = returnApi(value);
    const response = await fetch(url);
    let data = await response.json();
    if(data.cod  == '404'){
      alert("City not found. Please Try again with a valid country")
    }

    setHumidity(data.main.humidity + " %");
    setWind(Math.floor(data.wind.speed) + " km");
    setTemp(Math.floor(data.main.temp) + " °C");
    setLocation(data.name);
    switch (data.weather[0].icon) {
      case "01d" || "01n":
        setWeatherIcon(clear_img);
        break;
      case "02d" || "02n":
        setWeatherIcon(cloud_img);
        break;
      case "03d" || "03n":
        setWeatherIcon(drizzle_img);
        break;
      case "04d" || "04n":
        setWeatherIcon(drizzle_img);
        break;
      case "09d" || "09n":
        setWeatherIcon(rain_img);
        break;
      case "010d" || "010n":
        setWeatherIcon(rain_img);
        break;
      case "13d" || "13n":
        setWeatherIcon(snow_img);
        break;
      default:
        setWeatherIcon(clear_img);
        break;
    }
  };

  return (
    <>
      {/* Search Bar */}
      <div className="search-container">
        <div className="search-btn" onClick={search}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </div>

        <input
          className="search-input"
          id="searchbar"
          type="text"
          placeholder="Search..."
        />
      </div>

      {/* Card */}
      <div className="weather-card">
        <img alt="deneme" src={weatherIcon} />
        <text style={{ fontSize: "2.1rem" }}>{temp}</text>
        <text style={{ fontSize: "1.7rem" }}>{location}</text>
        <div className="card-bottom">
          <div className="humidity-container">
            <div>
              <img alt="nem" src={humidity_img}></img>
              <text>{humidity}</text>
            </div>
            <text>Humidity</text>
          </div>
          <div>
            <div>
              <img alt="nem" src={wind_img}></img>
              <text>{wind}</text>
            </div>
            <text>Wind</text>
          </div>
        </div>
      </div>
    </>
  );
}
