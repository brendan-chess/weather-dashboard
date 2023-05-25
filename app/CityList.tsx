"use client";

import { City } from "@prisma/client";
import { useContext } from "react";
import { CitiesContext } from "./citiesProvider";

export default function CityList() {
  const { storedCities, selectedCity, setSelectedCity } =
    useContext(CitiesContext);

  return (
    <div>
      <p className="mt-3 text-slate-300 font-bold">My Cities</p>
      {storedCities.length < 1 ? (
        <p className="text-sm text-slate-400 my-6 text-center italic">
          Search for a city to get started
        </p>
      ) : (
        storedCities.map((city: City) => {
          return (
            <div
              key={city.id}
              className={`p-3 my-3 text-slate-400 bg-slate-900 ring-2 ring-slate-700 rounded-lg text-sm cursor-pointer hover:bg-slate-700 ${
                selectedCity.id === city.id
                  ? "bg-sky-700 ring-sky-700 text-slate-100 hover:bg-sky-700"
                  : ""
              }`}
              onClick={() => setSelectedCity(city)}
            >
              <p>
                {city.city}, {city.state}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}
