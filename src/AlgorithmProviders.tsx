import { createContext, useState } from "react";

export type SortingAlgorithm = "insertion" | "merge" | "quick" | "heap";

export interface SortingSettings {
  algorithm: SortingAlgorithm;
  speed: number;
  amount: number;
}

const defaultSortingSettings: SortingSettings = {
  algorithm: "insertion",
  speed: 1,
  amount: 100,
};

interface SortingContext {
  settings: SortingSettings;
  setSettings: React.Dispatch<React.SetStateAction<SortingSettings>>;
}

export const SortingAlgorithmContext = createContext({} as SortingContext);

interface ProviderProps {
  children: React.ReactNode;
}

export function SortingProvider({ children }: ProviderProps) {
  const [settings, setSettings] = useState(defaultSortingSettings);
  return (
    <SortingAlgorithmContext.Provider value={{ settings, setSettings }}>
      {children}
    </SortingAlgorithmContext.Provider>
  );
}
