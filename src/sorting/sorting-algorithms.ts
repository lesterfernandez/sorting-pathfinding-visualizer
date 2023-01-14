import { insertionSort } from "./insertion-sort";
import { MaxHeap } from "./max-heap";
import { mergeSort } from "./merge-sort";
import { quickSort } from "./quick-sort";
import { SortingAlgorithm } from "./SortingContext";

export const sortingAlgorithms: Record<
  SortingAlgorithm,
  (array: number[]) => { newArray: number[]; animations: [number, number][] }
> = {
  insertion(array) {
    return insertionSort([...array], []);
  },

  merge(array) {
    const newArray = [...array];
    const animations: [number, number][] = [];

    mergeSort(
      Array.from({ length: newArray.length }),
      newArray,
      0,
      newArray.length - 1,
      animations
    );

    return { newArray, animations };
  },

  quick(array) {
    const newArray = [...array];
    const animations: [number, number][] = [];

    quickSort(newArray, 0, newArray.length - 1, animations);

    return { newArray, animations };
  },

  heap(array) {
    return new MaxHeap([...array]).heapSort();
  },
};
