import { SortingAlgorithm } from "./SortingContext";

export const sortingAlgorithms: Record<
  SortingAlgorithm,
  (array: number[]) => void
> = {
  insertion(array) {
    console.log(array);
  },
  merge(array) {
    console.log(array);
  },
  quick(array) {
    console.log(array);
  },
  heap(array) {
    console.log(array);
  },
};
