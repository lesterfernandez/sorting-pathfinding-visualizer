export const swap = (array: number[], i: number, j: number, animations?: [number, number][]) => {
  if (animations) {
    animations.push([i, j]);
  }
  const previousJ = array[j];
  array[j] = array[i];
  array[i] = previousJ;
};
