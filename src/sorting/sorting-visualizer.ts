import { useSortingStore } from "../stores/sorting-store";
import { sortingAlgorithms } from "./sorting-algorithms";

export const sortingVisualizer = (array: number[]) => async () => {
  const { algorithm, speed } = useSortingStore.getState();
  resetDemo(array);
  const { animations } = sortingAlgorithms[algorithm](array);
  if (algorithm === "merge") {
    await handleMergeSortAnimations(animations, speeds[speed]);
  } else {
    await handleInPlaceAnimations(animations, speeds[speed]);
  }
};

const resetDemo = (oldArray: number[]) => {
  oldArray.forEach((val, i) => {
    const rectangle = getSortingRectangle(i);
    if (!rectangle) {
      throw new Error(`could not find rectangle ${i}`);
    }
    rectangle.style.height = val + "%";
  });
};

const handleInPlaceAnimations = (animations: [number, number][], speed: number) =>
  new Promise<void>(resolve => {
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
            resolve();
          }
        }, speed);
      }, speed * i);
    });
  });

const handleMergeSortAnimations = (animations: [number, number][], speed: number) =>
  new Promise<void>(resolve => {
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
            resolve();
          }
        }, speed);
      }, speed * i);
    });
  });

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
