import { useContext } from "react";
import { DemoTopBar } from "../ui/DemoTopBar";
import { sortingAlgorithms } from "./sorting-algorithms";
import { SortingContext } from "./SortingContext";
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
          const { animations } = sortingAlgorithms[algorithm](array);
          resetDemo(array);
          if (algorithm === "merge") {
            handleMergeSortAnimations(animations, speeds[speed]);
            return;
          }
          handleInPlaceAnimations(animations, speeds[speed]);
        }}
      />
      <SortingVisualizer />
    </>
  );
};

const resetDemo = (oldArray: number[]) => {
  oldArray.forEach((val, i) => {
    const rectangle = document.querySelector<HTMLDivElement>(`#rectangle_${i}`);
    if (!rectangle) {
      throw new Error(`could not find rectangle ${i}`);
    }
    rectangle.style.height = val + "%";
  });
};

const handleInPlaceAnimations = (animations: [number, number][], speed: number) => {
  animations.forEach(([first, second], i) => {
    const firstRectangle = document.getElementById(`rectangle_${first}`);
    const secondRectangle = document.getElementById(`rectangle_${second}`);
    if (!firstRectangle || !secondRectangle) {
      throw new Error(`could not find rectangle ${first} or ${second}`);
    }

    setTimeout(() => {
      firstRectangle.classList.toggle("bg-amber-100");
      secondRectangle.classList.toggle("bg-amber-100");
      firstRectangle.classList.toggle("bg-blue-200");
      secondRectangle.classList.toggle("bg-blue-200");

      const firstHeight = firstRectangle?.style.height;
      firstRectangle.style.height = secondRectangle?.style.height;
      secondRectangle.style.height = firstHeight;

      setTimeout(() => {
        firstRectangle.classList.toggle("bg-amber-100");
        secondRectangle.classList.toggle("bg-amber-100");
        firstRectangle.classList.toggle("bg-blue-200");
        secondRectangle.classList.toggle("bg-blue-200");

        if (i === animations.length - 1) {
          animationPlaying = false;
        }
      }, speed);
    }, speed * i);
  });
};

const handleMergeSortAnimations = (animations: [number, number][], speed: number) => {
  animations.forEach(([rectangleId, newValue], i) => {
    const rectangle = document.getElementById(`rectangle_${rectangleId}`);
    if (!rectangle) {
      throw new Error(`could not find rectangle ${rectangleId}`);
    }
    setTimeout(() => {
      rectangle.classList.toggle("bg-amber-100");
      rectangle.classList.toggle("bg-blue-200");
      rectangle.style.height = newValue + "%";

      setTimeout(() => {
        rectangle.classList.toggle("bg-amber-100");
        rectangle.classList.toggle("bg-blue-200");
        if (i === animations.length - 1) {
          animationPlaying = false;
        }
      }, speed);
    }, speed * i);
  });
};

const speeds = {
  slow: 125,
  medium: 15,
  fast: 2,
};
