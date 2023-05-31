"use client";

import { City } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";
import useLocalStorage from "./useLocalStorage";

export const CitiesContext = createContext<{
  storedCities: City[];
  setStoredCities: React.Dispatch<React.SetStateAction<City[]>>;
  selectedCity: City;
  setSelectedCity: React.Dispatch<React.SetStateAction<City>>;
}>({
  storedCities: [],
  setStoredCities: () => {},
  selectedCity: { id: "", city: "", latitude: -1, longitude: -1, state: "" },
  setSelectedCity: () => {},
});

type CitiesProviderProps = {
  children: ReactNode;
};

export default function CitiesProvider({ children }: CitiesProviderProps) {
  const [storedCities, setStoredCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City>({
    id: "",
    city: "",
    latitude: -1,
    longitude: -1,
    state: "",
  });

  return (
    <CitiesContext.Provider
      value={{ storedCities, setStoredCities, selectedCity, setSelectedCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
