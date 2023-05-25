"use client";

import { City } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";
import useLocalStorage from "./useLocalStorage";

// export const CitiesContext = createContext<[City[], (value: City[]) => void]>([
//   [],
//   () => {},
// ]);

export const CitiesContext = createContext<{
  storedCities: City[];
  setStoredCities: React.Dispatch<React.SetStateAction<City[]>>;
  selectedCity: string;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
}>({
  storedCities: [],
  setStoredCities: () => {},
  selectedCity: "",
  setSelectedCity: () => {},
});

type CitiesProviderProps = {
  children: ReactNode;
};

export default function CitiesProvider({ children }: CitiesProviderProps) {
  // const [storedCities, setStoredCities] = useLocalStorage<City[]>(
  //   "weather-dashboard-cities",
  //   []
  // );
  const [storedCities, setStoredCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");

  return (
    <CitiesContext.Provider
      value={{ storedCities, setStoredCities, selectedCity, setSelectedCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
