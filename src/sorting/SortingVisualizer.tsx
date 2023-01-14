import React, { useContext } from "react";
import { VisualizerContainer } from "../ui/VisualizerContainer";
import { SortingContext } from "./SortingContext";

export const SortingVisualizer = React.memo(() => {
  const { array } = useContext(SortingContext);

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
