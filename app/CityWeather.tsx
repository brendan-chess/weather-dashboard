"use client";

import { useContext } from "react";
import { CitiesContext } from "./citiesProvider";

export default function CityWeather() {
  const { selectedCity } = useContext(CitiesContext);

  return (
    <div>
      <p className="text-slate-300 font-bold">Weather</p>
      {selectedCity.id === "" ? (
        <></>
      ) : (
        <div className="p-3 my-3 text-slate-400 bg-slate-900 ring-2 ring-slate-700 rounded-lg text-sm">
          <p>
            {selectedCity.city}, {selectedCity.state}
          </p>
        </div>
      )}
    </div>
  );
}
