import { ConfigureModalProvider } from "../modal/ConfigureModalContext";
import { SortingModal } from "../sorting/SortingModal";
import { useVisualize } from "../stores/visualize-store";
import { DemoLayout } from "../ui/DemoLayout";
import { bfsPathfind } from "./pathfinding-algorithms";
import { animateBfs } from "./pathfinding-visualizer";
import usePathfindingGrid from "./usePathfindingGrid";

const GRID_ROWS = 23;
const ANIMATION_SPEED = 10;

export default function PathfindingDemo() {
  const {
    gridElements,
    grid,
    sourceId,
    targetId,
    idFromIndex,
    indexFromId,
    resetGridPaint,
    disableDrawing,
    animationPlaying,
  } = usePathfindingGrid(GRID_ROWS);

  const bfsVisualization = async () => {
    resetGridPaint();
    const { path, animationArray } = bfsPathfind(
      grid.current,
      sourceId,
      targetId,
      idFromIndex,
      indexFromId
    );
    await animateBfs(sourceId, targetId, path, animationArray, animationPlaying, ANIMATION_SPEED);
  };

  useVisualize.setState({
    visualize: bfsVisualization,
  });

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
