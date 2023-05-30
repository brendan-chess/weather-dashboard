"use client";

import { City } from "@prisma/client";
import { useContext } from "react";
import { CitiesContext } from "./citiesProvider";

export default function CityList() {
  const { storedCities, selectedCity, setSelectedCity } =
    useContext(CitiesContext);

  return (
    <div>
      <p className="mt-6 text-slate-300 font-bold">My Cities</p>
      {storedCities.length < 1 ? (
        <p className="text-sm text-slate-400 my-6 text-center italic">
          Search for a city to get started
        </p>
      ) : (
        <div className="max-h-[386px] overflow-y-scroll mt-3 flex flex-col gap-3">
          {storedCities.map((city: City) => {
            const selected = city.id === selectedCity.id;
            return (
              <div
                key={city.id}
                className={`p-3 rounded-lg text-sm font-medium cursor-pointer  ${
                  selected
                    ? "bg-gradient-to-br from-blue-800 to-indigo-800 text-slate-100"
                    : "bg-gradient-to-br from-gray-800 to-gray-900 text-slate-300 hover:from-gray-700 hover:to-gray-800"
                }`}
                onClick={() => setSelectedCity(city)}
              >
                <p>
                  {city.city}, {city.state}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
