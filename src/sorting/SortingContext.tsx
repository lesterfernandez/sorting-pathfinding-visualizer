import { createContext, useMemo, useState } from "react";

export type SortingAlgorithm = "insertion" | "merge" | "quick" | "heap";

export type SortingSpeed = "slow" | "medium" | "fast";

export interface SortingSettings {
  algorithm: SortingAlgorithm;
  speed: SortingSpeed;
  amount: number;
}

const defaultSortingSettings: SortingSettings = {
  algorithm: "merge",
  speed: "medium",
  amount: 150,
};

interface SortingSettingsContext {
  settings: SortingSettings;
  setSettings: React.Dispatch<React.SetStateAction<SortingSettings>>;
  array: number[];
}

export const SortingContext = createContext({} as SortingSettingsContext);

interface ProviderProps {
  children: React.ReactNode;
}

export function SortingSettingsProvider({ children }: ProviderProps) {
  const [settings, setSettings] = useState(defaultSortingSettings);

  const array = useMemo(
    () => Array.from({ length: settings.amount }, () => ~~(Math.random() * 101)),
    [settings.amount]
  );

  return (
    <SortingContext.Provider value={{ settings, setSettings, array }}>
      {children}
    </SortingContext.Provider>
  );
}
