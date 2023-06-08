"use client";

import React, { useContext, useEffect, useState } from "react";
import { CitiesContext } from "./citiesProvider";

export default function CityWeather() {
  const { selectedCity } = useContext(CitiesContext);
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const res = await fetch(
        `/api/cities/weather?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}`
      );
      const json: Weather = await res.json();
      setWeather(json);
    };
    setWeather(null);
    if (selectedCity.id !== "") fetchWeather();
  }, [selectedCity]);

  return (
    <div className="p-3 my-3 md:mt-0 bg-gradient-to-br from-blue-800 to-indigo-800 rounded-lg">
      <div className="h-14">
        {selectedCity.id !== "" && weather !== null ? (
          <>
            <p className="text-xl font-semibold">
              {selectedCity.city}, {selectedCity.state}
            </p>
            <p className="opacity-60">{weather.current.time}</p>
          </>
        ) : (
          <Skeleton />
        )}
      </div>

      <div className="h-24 my-3">
        {selectedCity.id !== "" && weather !== null ? (
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
              className="h-24 w-24"
            />
          </div>
        ) : (
          <Skeleton />
        )}
      </div>

      <div className="h-52">
        {selectedCity.id !== "" && weather !== null ? (
          <div className="rounded-lg bg-blue-950 bg-opacity-50 py-3 px-2 md:px-7">
            <p className="text-base font-medium text-center mb-7">
              3-Day Forecast
            </p>
            <div className="flex justify-between">
              <Forecast
                date={weather.forecast.dayOne.date}
                conditionIcon={weather.forecast.dayOne.conditionIcon}
                temperatureLow={weather.forecast.dayOne.temperatureLow}
                temperatureHigh={weather.forecast.dayOne.temperatureHigh}
              />

              <Forecast
                date={weather.forecast.dayTwo.date}
                conditionIcon={weather.forecast.dayTwo.conditionIcon}
                temperatureLow={weather.forecast.dayTwo.temperatureLow}
                temperatureHigh={weather.forecast.dayTwo.temperatureHigh}
              />

              <Forecast
                date={weather.forecast.dayThree.date}
                conditionIcon={weather.forecast.dayThree.conditionIcon}
                temperatureLow={weather.forecast.dayThree.temperatureLow}
                temperatureHigh={weather.forecast.dayThree.temperatureHigh}
              />
            </div>
          </div>
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
}

interface ForecastProps {
  date: string;
  conditionIcon: string;
  temperatureLow: number;
  temperatureHigh: number;
}

function Forecast({
  date,
  conditionIcon,
  temperatureLow,
  temperatureHigh,
}: ForecastProps) {
  return (
    <div className="flex flex-col items-center">
      <p className="font-medium">{date}</p>
      <img src={conditionIcon} className="h-12 w-12 md:h-16 md:w-16 my-3" />
      <p className="text-sm">
        <span className="opacity-60">
          {temperatureLow}
          <span className="align-top">º</span>
          {" / "}
        </span>
        {temperatureHigh}
        <span className="align-top">º</span>
      </p>
    </div>
  );
}

function Skeleton() {
  return (
    <>
      <div className="h-full bg-blue-950 bg-opacity-50 rounded-lg" />
    </>
  );
}
