import { createContext, useMemo, useState } from "react";

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
    () =>
      Array.from({ length: settings.amount }, () => ~~(Math.random() * 101)),
    [settings.amount]
  );

  return (
    <SortingContext.Provider value={{ settings, setSettings, array }}>
      {children}
    </SortingContext.Provider>
  );
}
