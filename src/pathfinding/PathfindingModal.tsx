import { useState } from "react";
import { ConfigureModalFooter } from "../modal/ConfigureModalFooter";
import { PathfindingAlgorithm, usePathfindingStore } from "../stores/pathfinding-store";

export const PathfindingModal =
  (resetGrid: () => void) =>
  ({ toggleModal }: { toggleModal: () => void }) => {
    const [chosenAlgorithm, setChosenAlgorithm] = useState<PathfindingAlgorithm>("bfs");

    const updateAlgorithm = (algorithm: typeof chosenAlgorithm) =>
      void setChosenAlgorithm(algorithm);

    return (
      <>
        <div className="flex flex-col items-center gap-y-16 py-8">
          <div className="space-y-3">
            <h3>
              <label htmlFor="sort-selector">Choose an Algorithm</label>
            </h3>
            <select
              id="sort-selector"
              className="rounded-md border-2 px-4 py-2"
              value={chosenAlgorithm}
              onChange={e => void updateAlgorithm(e.target.value as typeof chosenAlgorithm)}
            >
              <option value={"bfs" satisfies typeof chosenAlgorithm}>Breadth-First-Search</option>
              <option value={"a*" satisfies typeof chosenAlgorithm}>A*</option>
            </select>
          </div>
          <button
            className="max-w-xs rounded bg-red-200 px-4 py-2 text-sm hover:bg-red-300"
            onClick={() => {
              resetGrid();
              console.log("resetting...");
            }}
          >
            Clear Grid
          </button>
        </div>
        <ConfigureModalFooter
          onSubmit={() => {
            usePathfindingStore.setState(chosenAlgorithm);
            toggleModal();
          }}
        />
      </>
    );
  };
