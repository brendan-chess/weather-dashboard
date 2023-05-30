"use client";

import { useState, useMemo, useContext } from "react";
import debounce from "lodash.debounce";
import { City } from "@prisma/client";
import { CitiesContext } from "./citiesProvider";

export default function CitySearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const { storedCities, setStoredCities } = useContext(CitiesContext);

  async function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    if (value.length > 0) {
      const res = await fetch(
        `http://localhost:3000/api/cities/search?query=${value}`
      );
      const json = await res.json();
      setResults(json);
    } else {
      setResults([]);
    }
    setLoading(false);
  }

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 500),
    []
  );

  return (
    <div className="flex flex-col text-slate-400 rounded-lg relative">
      <input
        type="text"
        value={query}
        placeholder='e.g. "Boston"'
        className="bg-gradient-to-br from-gray-800 to-gray-900 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-700 rounded-lg text-sm p-3 "
        onChange={(event) => {
          setQuery(event.target.value);
          if (event.target.value.length === 0) {
            setResults([]);
          } else {
            setLoading(true);
            debouncedChangeHandler(event);
          }
        }}
      />
      <div className="absolute right-3 top-3">
        {loading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 animate-spin"
          >
            <path
              fillRule="evenodd"
              d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <div
        className={`bg-gradient-to-br from-gray-800 to-gray-900 text-slate-300 absolute min-w-full top-14 divide-y divide-slate-700 ring-2 ring-slate-700 rounded-lg transition-all ease-in duration-150 origin-top z-10 ${
          results.length === 0
            ? "scale-y-0 opacity-0"
            : "scale-y-100 opacity-100"
        }`}
      >
        {results.map((result: City) => {
          return (
            <div
              key={result.id}
              className="text-sm p-3 cursor-pointer hover:bg-slate-700 hover:text-slate-300"
              onClick={() => {
                setResults([]);
                setQuery("");
                setStoredCities([...storedCities, result]);
              }}
            >
              <p>
                {result.city}, {result.state}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
