import { create } from "zustand";

interface AlgorithmStore {
  visualize: () => Promise<void>;
}

export const useVisualize = create<AlgorithmStore>(() => ({
  visualize: () => Promise.resolve(undefined),
}));
