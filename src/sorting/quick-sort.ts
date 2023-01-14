import { swap } from "./swap";

export const quickSort = (
  array: number[],
  lo: number,
  hi: number,
  animations: [number, number][]
) => {
  if (lo >= hi) return;

  const pivotValue = array[lo];
  let lt = lo;
  let gt = hi;

  while (lt <= gt) {
    if (array[lt] <= pivotValue) {
      lt++;
    } else {
      swap(array, lt, gt--, animations);
    }
  }

  swap(array, lo, gt, animations);

  quickSort(array, lo, gt - 1, animations);
  quickSort(array, gt + 1, hi, animations);
};
