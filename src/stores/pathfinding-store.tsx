import { create } from "zustand";

export type PathfindingAlgorithm = "bfs" | "a*";

export const usePathfindingStore = create<PathfindingAlgorithm>(() => "bfs");
