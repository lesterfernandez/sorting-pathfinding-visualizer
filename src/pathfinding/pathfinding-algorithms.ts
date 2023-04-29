import Queue from "./Queue";

const invalidNeighbor = ([row, col]: [number, number], grid: number[][]) =>
  row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] === 1;

export const bfsPathfind = (
  grid: number[][],
  sourceId: number,
  targetId: number,
  idFromIndex: (row: number, col: number) => number,
  indexFromId: (id: number) => [number, number]
): {
  path: Map<number, number>;
  animationArray: number[];
} => {
  console.time("BFS Timer");

  const [sourceRow, sourceCol] = indexFromId(sourceId);
  const source = [sourceRow, sourceCol] as [number, number];
  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const visited = new Set<string>([JSON.stringify(source)]);
  const queue = new Queue<typeof source>();
  const path = new Map<number, number>();
  const animationArray = [] as number[];

  path.set(sourceId, sourceId);
  queue.add(source);

  while (!queue.isEmpty()) {
    const [row, col] = queue.remove();
    for (const [x, y] of dirs) {
      const neighbor = [row + x, col + y] as [number, number];

      if (invalidNeighbor(neighbor, grid) || visited.has(JSON.stringify(neighbor))) {
        continue;
      }

      const neighborId = idFromIndex(...neighbor);
      visited.add(JSON.stringify(neighbor));
      path.set(neighborId, idFromIndex(row, col));

      if (neighborId === targetId) {
        console.timeEnd("BFS Timer");
        return { path, animationArray };
      }

      animationArray.push(neighborId);
      queue.add(neighbor);
    }
  }

  console.timeEnd("BFS Timer");
  return { path, animationArray };
};
