import { useContext } from "react";
import { DemoTopBar } from "../ui/DemoTopBar";
import { sortingAlgorithms } from "./sorting-algorithms";
import { SortingAlgorithm, SortingContext } from "./SortingContext";
import { SortingVisualizer } from "./SortingVisualizer";

let animationPlaying = false;

export const SortingDemo = () => {
  const {
    settings: { algorithm, speed },
    array,
  } = useContext(SortingContext);

  return (
    <>
      <DemoTopBar
        visualize={() => {
          if (animationPlaying) {
            return;
          }
          animationPlaying = true;

          resetDemo(array);

          const { animations } = getSortingAnimations(array, algorithm);

          if (algorithm === "merge") {
            handleMergeSortAnimations(animations, speeds[speed]);
          } else {
            handleInPlaceAnimations(animations, speeds[speed]);
          }
        }}
      />
      <SortingVisualizer />
    </>
  );
};

const getSortingAnimations = (array: number[], algorithm: SortingAlgorithm) =>
  sortingAlgorithms[algorithm](array);

const resetDemo = (oldArray: number[]) => {
  oldArray.forEach((val, i) => {
    const rectangle = getSortingRectangle(i);
    if (!rectangle) {
      throw new Error(`could not find rectangle ${i}`);
    }
    rectangle.style.height = val + "%";
  });
};

const handleInPlaceAnimations = (animations: [number, number][], speed: number) => {
  animations.forEach(([first, second], i) => {
    const firstRectangle = getSortingRectangle(first);
    const secondRectangle = getSortingRectangle(second);
    if (!firstRectangle || !secondRectangle) {
      throw new Error(`could not find rectangle ${first} or ${second}`);
    }

    setTimeout(() => {
      toggleElementSortingColor(firstRectangle);
      toggleElementSortingColor(secondRectangle);

      const firstHeight = firstRectangle?.style.height;
      firstRectangle.style.height = secondRectangle?.style.height;
      secondRectangle.style.height = firstHeight;

      setTimeout(() => {
        toggleElementSortingColor(firstRectangle);
        toggleElementSortingColor(secondRectangle);

        if (i === animations.length - 1) {
          animationPlaying = false;
        }
      }, speed);
    }, speed * i);
  });
};

const handleMergeSortAnimations = (animations: [number, number][], speed: number) => {
  animations.forEach(([rectangleId, newValue], i) => {
    const rectangle = getSortingRectangle(rectangleId);
    if (!rectangle) {
      throw new Error(`could not find rectangle ${rectangleId}`);
    }
    setTimeout(() => {
      toggleElementSortingColor(rectangle);
      rectangle.style.height = newValue + "%";

      setTimeout(() => {
        toggleElementSortingColor(rectangle);
        if (i === animations.length - 1) {
          animationPlaying = false;
        }
      }, speed);
    }, speed * i);
  });
};

const toggleElementSortingColor = (element: HTMLElement) => {
  element.classList.toggle("bg-amber-100");
  element.classList.toggle("bg-blue-200");
};

const getSortingRectangle = (index: number) => document.getElementById(`rectangle_${index}`);

const speeds = {
  slow: 125,
  medium: 15,
  fast: 2,
};
