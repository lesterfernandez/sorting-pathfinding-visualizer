import { createContext, useState } from "react";

type SortingAlgorithm = "insertion" | "merge" | "quick" | "heap";

interface SortingSettings {
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
  setSettings: React.Dispatch<React.SetStateAction<SortingSettings>>;
  settings: SortingSettings;
}

const SortingAlgorithmContext = createContext({} as SortingContext);

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
