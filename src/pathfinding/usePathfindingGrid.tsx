import { PointerEventHandler, useRef } from "react";

export default (rowCount: number) => {
  const idFromIndex = (row: number, col: number) => row * rowCount + col;
  const rowFromId = (id: number) => Math.floor(id / rowCount);
  const colFromId = (id: number) => id % rowCount;
  const indexFromId = (id: number) => [rowFromId(id), colFromId(id)] as [number, number];

  const [targetRow, targetCol] = [Math.floor(rowCount / 2), 21];
  const targetId = idFromIndex(targetRow, targetCol);
  const [sourceRow, sourceCol] = [Math.floor(rowCount / 2), 1];
  const sourceId = idFromIndex(sourceRow, sourceCol);
  const animationPlaying = useRef(false);

  const grid = useRef<number[][]>(
    Array.from({ length: rowCount }, () => Array.from({ length: rowCount }, () => 0))
  );
  grid.current[targetRow][targetCol] = 2;

  const processed = useRef(new Set<string>());
  const dragging = useRef(false);
  const placing = useRef(true);

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

  const resetGridPaint = () => {
    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < rowCount; j++) {
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

  const gridElements = Array.from({ length: rowCount ** 2 }).map((_, i) => {
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

  return {
    gridElements,
    grid,
    sourceId,
    targetId,
    resetGridPaint,
    disableDrawing,
    animationPlaying,
    idFromIndex,
    indexFromId,
  };
};
