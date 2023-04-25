import React from "react";
import { useSortingArray } from "../stores/sorting-store";
import { VisualizerContainer } from "../ui/VisualizerContainer";

export const SortingVisualizer = React.memo(() => {
  const array = useSortingArray();

  return (
    <VisualizerContainer>
      <div className="flex h-full w-full items-end">
        {array.map((val, i) => (
          <div
            id={`rectangle_${i}`}
            key={`rectangle_${i}`}
            className="bg-amber-100"
            style={{
              height: val + "%",
              width: "100%",
              flexGrow: 1,
              transition: "all 100ms ease, background-color 0s",
            }}
          ></div>
        ))}
      </div>
    </VisualizerContainer>
  );
});
