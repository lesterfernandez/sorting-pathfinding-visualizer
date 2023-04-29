import { PointerEventHandler, useRef } from "react";
import { ConfigureModalProvider } from "../modal/ConfigureModalContext";
import { SortingModal } from "../sorting/SortingModal";
import { useVisualize } from "../stores/visualize-store";
import { DemoLayout } from "../ui/DemoLayout";
import Queue from "./Queue";

const GRID_ROWS = 23;
const ANIMATION_SPEED = 10;

export default function PathfindingDemo() {
  const rowFromId = (id: number) => Math.floor(id / GRID_ROWS);
  const colFromId = (id: number) => id % GRID_ROWS;
  const idFromIndex = (row: number, col: number) => row * GRID_ROWS + col;

  const [targetRow, targetCol] = [Math.floor(GRID_ROWS / 2), 21];
  const targetId = idFromIndex(targetRow, targetCol);
  const [sourceRow, sourceCol] = [Math.floor(GRID_ROWS / 2), 1];
  const sourceId = idFromIndex(sourceRow, sourceCol);

  const grid = useRef<number[][]>(
    Array.from({ length: GRID_ROWS }, () => Array.from({ length: GRID_ROWS }, () => 0))
  );
  grid.current[targetRow][targetCol] = 2;

  const processed = useRef(new Set<string>());
  const dragging = useRef(false);
  const placing = useRef(true);
  const animationPlaying = useRef(false);

  const handlePointerOver: PointerEventHandler<HTMLDivElement> = e => {
    if (animationPlaying.current || !dragging.current || processed.current.has(e.currentTarget.id))
      return;
    setBlock(e.currentTarget);
    processed.current.add(e.currentTarget.id);
  };

  const handlePointerDown: PointerEventHandler<HTMLDivElement> = e => {
    if (animationPlaying.current) return;
    dragging.current = true;
    placing.current = isBlockEmpty(e.currentTarget);
    processed.current.add(e.currentTarget.id);
    setBlock(e.currentTarget);
    // Prevents "direct manipulation" pointer capture on mobile
    // https://www.w3.org/TR/pointerevents3/#implicit-pointer-capture
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const disableDrawing = () => {
    if (!dragging.current) return;
    dragging.current = false;
    processed.current.clear();
  };

  const setBlock = (element: HTMLDivElement) => {
    const row = rowFromId(+element.id);
    const col = colFromId(+element.id);
    if (placing.current && element.classList.contains("bg-white")) {
      element.classList.remove("bg-white");
      element.classList.add("bg-amber-100");
      grid.current[row][col] = 1;
    } else if (!placing.current && element.classList.contains("bg-amber-100")) {
      element.classList.remove("bg-amber-100");
      element.classList.add("bg-white");
      grid.current[row][col] = 0;
    }
  };

  const isBlockEmpty = (element: HTMLDivElement) => element.classList.contains("bg-white");

  const gridElements = Array.from({ length: GRID_ROWS ** 2 }).map((_, i) => {
    if (i === targetId) {
      return (
        <div
          id={`${i}`}
          key={`pf-${i}`}
          className="h-[42px] touch-none select-none bg-red-500 outline-dashed outline-1 outline-gray-300"
        ></div>
      );
    }

    if (i === sourceId) {
      return (
        <div
          id={`${i}`}
          key={`pf-${i}`}
          className="h-[42px] touch-none select-none bg-blue-500 outline-dashed outline-1 outline-gray-300"
        ></div>
      );
    }

    return (
      <div
        id={`${i}`}
        key={`pf-${i}`}
        onPointerDown={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerUp={disableDrawing}
        onPointerCancel={disableDrawing}
        className="h-[42px] touch-none select-none bg-white outline-dashed outline-1 outline-gray-300"
      ></div>
    );
  });

  useVisualize.setState({
    visualize: async () => {
      resetGridPaint();
      const { path, animationArray } = bfsPathfind();

      await new Promise<void>(resolve => {
        animationArray.forEach((id, iteration) => {
          setTimeout(() => {
            const element = document.getElementById(String(id)) as HTMLDivElement;
            element.classList.add("bg-blue-300");
            element.classList.remove("bg-white");
            if (iteration === animationArray.length - 1) {
              resolve();
            }
          }, iteration * ANIMATION_SPEED);
        });
      });

      if (!path.has(targetId)) {
        animationPlaying.current = false;
        return;
      }

      await new Promise<void>(resolve => {
        let current = targetId as number;
        let iteration = 1;
        while (current !== sourceId) {
          current = path.get(current) as number;
          // super hacky.....
          // since the timeouts are created all in the same closure, i need to give each one a unique "current" value
          (localCurrent =>
            setTimeout(() => {
              const element = document.getElementById(String(localCurrent)) as HTMLDivElement;
              element.classList.remove("bg-blue-300");
              element.classList.add("bg-red-300");
              if (String(localCurrent) === String(sourceId)) {
                console.log("done");
                animationPlaying.current = false;
                resolve();
              }
            }, iteration * ANIMATION_SPEED))(current);
          iteration++;
        }
      });
    },
  });

  const resetGridPaint = () => {
    for (let i = 0; i < GRID_ROWS; i++) {
      for (let j = 0; j < GRID_ROWS; j++) {
        const id = idFromIndex(i, j);
        if (grid.current[i][j] === 0 && id !== sourceId && id !== targetId) {
          const element = document.getElementById(String(idFromIndex(i, j))) as HTMLDivElement;
          element.classList.remove("bg-blue-300");
          element.classList.remove("bg-red-300");
          element.classList.remove("bg-amber-100");
          element.classList.add("bg-white");
        }
      }
    }
  };

  const invalidNeighbor = (row: number, col: number) =>
    row < 0 || row >= GRID_ROWS || col < 0 || col >= GRID_ROWS || grid.current[row][col] === 1;

  const bfsPathfind = (): {
    path: Map<number, number>;
    animationArray: number[];
  } => {
    console.time("BFS Timer");
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
    path.set(sourceId, sourceId);
    queue.add(source);

    const animationArray = [] as number[];

    while (!queue.isEmpty()) {
      const [row, col] = queue.remove();
      for (const [x, y] of dirs) {
        const neighbor = [row + x, col + y] as [number, number];
        if (invalidNeighbor(...neighbor) || visited.has(JSON.stringify(neighbor))) {
          continue;
        }
        visited.add(JSON.stringify(neighbor));
        path.set(idFromIndex(...neighbor), idFromIndex(row, col));

        if (grid.current[neighbor[0]][neighbor[1]] === 2) {
          console.timeEnd("BFS Timer");
          return { path, animationArray };
        }

        animationArray.push(idFromIndex(...neighbor));
        queue.add(neighbor);
      }
    }
    console.timeEnd("BFS Timer");
    return { path, animationArray };
  };

  return (
    <ConfigureModalProvider modal={SortingModal}>
      <DemoLayout>
        <div
          className="absolute inset-0 grid auto-rows-min grid-cols-[repeat(23,_minmax(0,_1fr))] grid-rows-[repeat(23,_minmax(0,_1fr))] gap-0 overflow-hidden"
          onPointerLeave={disableDrawing}
        >
          {gridElements}
        </div>
      </DemoLayout>
    </ConfigureModalProvider>
  );
}
