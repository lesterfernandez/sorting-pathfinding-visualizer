export const mergeSort = (
  aux: number[],
  nums: number[],
  lo: number,
  hi: number,
  animations: [number, number][]
) => {
  if (lo >= hi) return;
  const mid = Math.floor((hi - lo) / 2) + lo;
  mergeSort(aux, nums, lo, mid, animations);
  mergeSort(aux, nums, mid + 1, hi, animations);
  mergeNums(aux, nums, lo, mid, hi, animations);
};

const mergeNums = (
  aux: number[],
  array: number[],
  lo: number,
  mid: number,
  hi: number,
  animations: [number, number][]
) => {
  for (let i = lo; i <= hi; i++) {
    aux[i] = array[i];
  }

  let i = lo;
  let j = mid + 1;

  for (let k = lo; k <= hi; k++) {
    if (i > mid) {
      animations.push([k, aux[j]]);
      array[k] = aux[j++];
    } else if (j > hi) {
      animations.push([k, aux[i]]);
      array[k] = aux[i++];
    } else if (aux[i] <= aux[j]) {
      animations.push([k, aux[i]]);
      array[k] = aux[i++];
    } else {
      animations.push([k, aux[j]]);
      array[k] = aux[j++];
    }
  }
};
