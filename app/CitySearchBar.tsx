"use client";

import { useState } from "react";

type Result = {
  id: string;
  city: string;
  state: string;
};

const sampleResults: Result[] = [
  {
    id: "1",
    city: "Portland",
    state: "Oregon",
  },
  {
    id: "2",
    city: "Portland",
    state: "Maine",
  },
  {
    id: "3",
    city: "Portland",
    state: "Delware",
  },
];

export default function CitySearchBar() {
  const [results, setResults] = useState<Result[]>(sampleResults);

  return (
    <div className="flex flex-col bg-slate-900 rounded-lg text-slate-400">
      <input
        type="text"
        placeholder="Type here..."
        className="bg-slate-900 placeholder-slate-400 rounded-lg text-sm p-3 focus:outline-none focus:border-sky-700 focus:ring-2 focus:ring-sky-700 relative"
      />
      <div className="absolute right-7 mt-3">
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
      </div>
      <div className="divide-y divide-slate-700">
        {results.map((result: Result) => {
          return (
            <div key={result.id} className="text-sm p-3">
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
