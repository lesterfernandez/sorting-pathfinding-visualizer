import { useContext } from "react";
import { DemoTopBar } from "../ui/DemoTopBar";
import { sortingAlgorithms } from "./sortingAlgorithms";
import { SortingContext } from "./SortingContext";
import { SortingVisualizer } from "./SortingVisualizer";

export const SortingDemo = () => {
  const {
    settings: { algorithm },
    array,
  } = useContext(SortingContext);

  return (
    <>
      <DemoTopBar
        visualize={() => void sortingAlgorithms[algorithm]([...array])}
      />
      <SortingVisualizer />
    </>
  );
};
