"use client";

import { useContext, useEffect, useState } from "react";
import { CitiesContext } from "./citiesProvider";

// const sampleWeather = {
//   condition: "Partly cloudy",
//   humidity: 65,
//   pressure: 29.92,
//   temperature: 77,
//   temperatureFeelsLike: 79,
//   windDirection: "SSE",
//   windGustSpeed: 7,
//   windSpeed: 6,
// };

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
      {selectedCity.id !== "" && (
        <div className="p-3 my-3 bg-gradient-to-r from-indigo-800 to-blue-800 rounded-lg">
          <p className="text-xl font-semibold">
            {selectedCity.city}, {selectedCity.state}
          </p>
          {weather !== null && (
            <>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <p className="text-4xl font-semibold mb-2">
                    {weather.current.temperature}
                    <span className="text-lg align-top">º</span>
                  </p>

                  <p className="text-sm">{weather.current.condition}</p>
                </div>

                <img
                  src={weather.current.conditionIcon}
                  alt={weather.current.condition}
                  className="h-min scale-75"
                />
              </div>

              <div className="rounded-lg p-2 my-2 bg-blue-950 bg-opacity-50">
                <p className="text-sm mb-3 text-center">3-Day Forecast</p>
                <div className="flex justify-between">
                  <div className="flex flex-col items-center">
                    <p className="text-sm opacity-60">
                      {weather.forecast.dayOne.date}
                    </p>
                    <img
                      src={weather.forecast.dayOne.conditionIcon}
                      alt={weather.current.condition}
                      className="scale-50"
                    />

                    <p className="text-xs">
                      <span className="opacity-60">
                        {weather.forecast.dayOne.temperatureLow}
                        <span className="align-top">º</span>
                        {" / "}
                      </span>
                      {weather.forecast.dayOne.temperatureHigh}
                      <span className="align-top">º</span>
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <p className="text-sm opacity-60">
                      {weather.forecast.dayTwo.date}
                    </p>
                    <img
                      src={weather.forecast.dayTwo.conditionIcon}
                      alt={weather.current.condition}
                      className="scale-50"
                    />
                    <p className="text-xs">
                      <span className="opacity-60">
                        {weather.forecast.dayTwo.temperatureLow}
                        <span className="align-top">º</span>
                        {" / "}
                      </span>
                      {weather.forecast.dayTwo.temperatureHigh}
                      <span className="align-top">º</span>
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <p className="text-sm opacity-60">
                      {weather.forecast.dayThree.date}
                    </p>
                    <img
                      src={weather.forecast.dayThree.conditionIcon}
                      alt={weather.current.condition}
                      className="scale-50"
                    />
                    <p className="text-xs">
                      <span className="opacity-60">
                        {weather.forecast.dayThree.temperatureLow}
                        <span className="align-top">º</span>
                        {" / "}
                      </span>
                      {weather.forecast.dayThree.temperatureHigh}
                      <span className="align-top">º</span>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
