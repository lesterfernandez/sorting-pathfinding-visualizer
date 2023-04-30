import { create } from "zustand";

export type SortingAlgorithm = "insertion" | "merge" | "quick" | "heap";

export type SortingSpeed = "slow" | "medium" | "fast";

export interface SortingStore {
  algorithm: SortingAlgorithm;
  speed: SortingSpeed;
  amount: number;
}

export const useSortingStore = create<SortingStore>(() => ({
  algorithm: "merge",
  speed: "medium",
  amount: 150,
}));
