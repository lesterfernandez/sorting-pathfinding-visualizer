import { MinHeap } from "./MinHeap";
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
  const visited = new Set<number>([sourceId]);
  const queue = new Queue<typeof source>();
  const path = new Map<number, number>();
  const animationArray = [] as number[];

  path.set(sourceId, sourceId);
  queue.add(source);

  while (!queue.isEmpty()) {
    const [row, col] = queue.remove();
    for (const [x, y] of dirs) {
      const neighbor = [row + x, col + y] as [number, number];
      const neighborId = idFromIndex(...neighbor);

      if (invalidNeighbor(neighbor, grid) || visited.has(neighborId)) {
        continue;
      }

      visited.add(neighborId);
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

interface AStarNode {
  row: number;
  col: number;
  dist: number;
}

const manhattan = (row: number, col: number, targetRow: number, targetCol: number) =>
  Math.abs(targetRow - row) + Math.abs(targetCol - col);

export const astarPathfind = (
  grid: number[][],
  sourceId: number,
  targetId: number,
  idFromIndex: (row: number, col: number) => number,
  indexFromId: (id: number) => [number, number]
): {
  path: Map<number, number>;
  animationArray: number[];
} => {
  console.time("A* Timer");

  const [sourceRow, sourceCol] = indexFromId(sourceId);
  const [targetRow, targetCol] = indexFromId(targetId);
  const source: AStarNode = { row: sourceRow, col: sourceCol, dist: 0 };
  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  const nodeDist = new Map<number, number>([[sourceId, 0]]);
  const pq = new MinHeap<AStarNode>();
  const path = new Map<number, number>();
  const animationArray = [] as number[];

  pq.add(source, 0);
  nodeDist.set(sourceId, 0);
  path.set(sourceId, sourceId);

  while (!pq.isEmpty()) {
    const { row, col, dist } = pq.remove();

    if (row === targetRow && col === targetCol) {
      console.timeEnd("A* Timer");
      return { path, animationArray };
    }

    for (const [x, y] of dirs) {
      const neighborRow = row + x;
      const neighborCol = col + y;
      if (invalidNeighbor([neighborRow, neighborCol], grid)) continue;
      const neighborId = idFromIndex(neighborRow, neighborCol);

      if (dist + 1 < (nodeDist.get(neighborId) ?? Number.POSITIVE_INFINITY)) {
        const neighborHeuristic =
          dist + 1 + manhattan(neighborRow, neighborCol, targetRow, targetCol);

        const neighbor: AStarNode = {
          row: neighborRow,
          col: neighborCol,
          dist: dist + 1,
        };

        pq.add(neighbor, neighborHeuristic);
        path.set(neighborId, idFromIndex(row, col));
        nodeDist.set(neighborId, dist + 1);
        animationArray.push(neighborId);
      }
    }
  }

  console.timeEnd("A* Timer");
  return { path, animationArray };
};
