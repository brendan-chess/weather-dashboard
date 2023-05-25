"use client";

import { useContext, useEffect, useState } from "react";
import { CitiesContext } from "./citiesProvider";

export default function CityWeather() {
  const { selectedCity } = useContext(CitiesContext);
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const res = await fetch(
        `http://localhost:3000/api/cities/weather?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}`
      );
      const json: Weather = await res.json();
      setWeather(json);
    };

    setWeather(null);
    if (selectedCity.id !== "") fetchWeather();
  }, [selectedCity]);

  return (
    <div>
      <p className="text-slate-300 font-bold">Weather</p>
      <div className="p-3 my-3 text-slate-400 bg-slate-900 ring-2 ring-slate-700 rounded-lg text-sm">
        <p>
          {selectedCity.city}, {selectedCity.state}
        </p>
        {weather !== null && (
          <>
            <p>{weather.temperature}ºF</p>
            <p>Feels like {weather.temperatureFeelsLike}ºF</p>
            <p>{weather.condition}</p>
            <p>
              Wind {weather.windSpeed}mph {weather.windDirection}
            </p>
            <p>Gusts {weather.windGustSpeed}mph</p>
            <p>Pressure {weather.pressure}</p>
            <p>Humidity {weather.humidity}%</p>
          </>
        )}
      </div>
    </div>
  );
}
