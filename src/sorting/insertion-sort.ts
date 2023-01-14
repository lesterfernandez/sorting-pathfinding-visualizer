export const insertionSort = (array: number[], animations: [number, number][]) => {
  for (let i = 1; i < array.length; i++) {
    let j = i;
    while (j > 0 && array[j] < array[j - 1]) {
      animations.push([j, j - 1]);
      const tmp = array[j - 1];
      array[j - 1] = array[j];
      array[j] = tmp;
      j--;
    }
  }
  return { newArray: array, animations };
};
