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

  return selectedCity.id !== "" ? (
    <div className="p-3 my-3 md:mt-0 bg-gradient-to-br from-blue-800 to-indigo-800 rounded-lg h-full min-w-[335px]">
      {weather !== null && selectedCity.id !== "" ? (
        <>
          <p className="text-xl font-semibold">
            {selectedCity.city}, {selectedCity.state}
          </p>
          <p className="opacity-60">{weather.current.time}</p>
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

          <div className="rounded-lg px-2 py-4 mt-3 bg-blue-950 bg-opacity-50">
            <p className="text-base font-medium mb-6 text-center">
              3-Day Forecast
            </p>
            <div className="flex justify-between">
              <div className="flex flex-col items-center">
                <p className="font-medium">{weather.forecast.dayOne.date}</p>
                <img
                  src={weather.forecast.dayOne.conditionIcon}
                  alt={weather.current.condition}
                  className="scale-50"
                />
                <p className="text-sm">
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
                <p className="font-medium">{weather.forecast.dayTwo.date}</p>
                <img
                  src={weather.forecast.dayTwo.conditionIcon}
                  alt={weather.current.condition}
                  className="scale-50"
                />
                <p className="text-sm">
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
                <p className="font-medium">{weather.forecast.dayThree.date}</p>
                <img
                  src={weather.forecast.dayThree.conditionIcon}
                  alt={weather.current.condition}
                  className="scale-50"
                />
                <p className="text-sm">
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
      ) : (
        <div className="animate-pulse">
          <div className="h-6 w-1/2 bg-blue-950 bg-opacity-50 rounded-lg mb-3" />
          <div className="h-4 w-1/4 bg-blue-950 bg-opacity-50 rounded-md" />
          <div className="flex justify-between mt-4 mb-2">
            <div className="h-12 w-12 bg-blue-950 bg-opacity-50 rounded-xl" />
            <div className="h-12 w-12 mr-8 bg-blue-950 bg-opacity-50 rounded-xl" />
          </div>
          <div className="h-4 w-1/3 bg-blue-950 bg-opacity-50 rounded-md" />
          <div className="h-56 w-full mt-7 bg-blue-950 bg-opacity-50 rounded-lg" />
        </div>
      )}
    </div>
  ) : (
    <div className="p-3 my-3 md:mt-0 bg-gradient-to-br from-blue-800 to-indigo-800 rounded-lg h-full min-w-[335px]">
      <div className="h-6 w-1/2 bg-blue-950 bg-opacity-50 rounded-lg mb-3" />
      <div className="h-4 w-1/4 bg-blue-950 bg-opacity-50 rounded-md" />
      <div className="flex justify-between mt-4 mb-2">
        <div className="h-12 w-12 bg-blue-950 bg-opacity-50 rounded-xl" />
        <div className="h-12 w-12 mr-8 bg-blue-950 bg-opacity-50 rounded-xl" />
      </div>
      <div className="h-4 w-1/3 bg-blue-950 bg-opacity-50 rounded-md" />
      <div className="h-56 w-full mt-7 bg-blue-950 bg-opacity-50 rounded-lg" />
    </div>
  );
}
