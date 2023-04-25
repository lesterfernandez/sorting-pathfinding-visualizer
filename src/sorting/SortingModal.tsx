import { useState } from "react";
import { ConfigureModalFooter } from "../modal/ConfigureModalFooter";
import {
  SortingAlgorithm,
  SortingSpeed,
  SortingStore,
  useSortingStore,
} from "../stores/sorting-store";

interface Props {
  toggleModal: () => void;
}

export function SortingModal({ toggleModal }: Props) {
  const [newSettings, setNewSettings] = useState<SortingStore>(useSortingStore.getState());

  const updateSpeed = (e: React.ChangeEvent<HTMLInputElement>) =>
    void setNewSettings(prev => ({ ...prev, speed: e.target.value as SortingSpeed }));

  const updateAlgorithm = (algorithm: SortingAlgorithm) =>
    void setNewSettings(prev => ({ ...prev, algorithm }));

  return (
    <>
      <div className="flex-grow overflow-y-scroll">
        <div className="flex flex-col gap-y-16 py-10">
          <div className="space-y-3">
            <h3>
              <label htmlFor="sort-selector">Step 1: Choose an Algorithm</label>
            </h3>
            <select
              id="sort-selector"
              className="rounded-md border-2 px-4 py-2"
              value={newSettings.algorithm}
              onChange={e => void updateAlgorithm(e.target.value as SortingAlgorithm)}
            >
              <option value={"merge" satisfies SortingAlgorithm}>Merge Sort</option>
              <option value={"quick" satisfies SortingAlgorithm}>Quick Sort</option>
              <option value={"heap" satisfies SortingAlgorithm}>Heap Sort</option>
              <option value={"insertion" satisfies SortingAlgorithm}>Insertion Sort</option>
            </select>
          </div>
          <div className="space-y-3">
            <h3>Step 2 (optional): Choose a Speed</h3>
            <div className="mx-auto flex max-w-xs justify-around rounded-md border-2 px-4 py-2">
              <label className="inline-flex items-center gap-1">
                Slow
                <input
                  type="radio"
                  value={"slow" satisfies SortingSpeed}
                  name="sort-speed"
                  onChange={updateSpeed}
                />
              </label>
              <label className="inline-flex items-center gap-1">
                Medium
                <input
                  type="radio"
                  value={"medium" satisfies SortingSpeed}
                  name="sort-speed"
                  onChange={updateSpeed}
                  defaultChecked
                />
              </label>
              <label className="inline-flex items-center gap-1">
                Fast
                <input
                  type="radio"
                  value={"fast" satisfies SortingSpeed}
                  name="sort-speed"
                  onChange={updateSpeed}
                />
              </label>
            </div>
          </div>
          <div className="space-y-3">
            <h3>Step 3 (optional): Set Amount of Rectangles</h3>
            <label className="mx-auto flex max-w-xs justify-center gap-3 rounded-md border-2 px-4 py-2">
              <input
                className="w-full"
                type="range"
                min={1}
                max={300}
                value={newSettings.amount}
                onChange={e =>
                  void setNewSettings(state => ({
                    ...state,
                    amount: +e.target.value,
                  }))
                }
              />
              <span className="w-8">{newSettings.amount}</span>
            </label>
          </div>
        </div>
      </div>
      <ConfigureModalFooter
        onSubmit={() => {
          useSortingStore.setState(newSettings);
          toggleModal();
        }}
      />
    </>
  );
}
