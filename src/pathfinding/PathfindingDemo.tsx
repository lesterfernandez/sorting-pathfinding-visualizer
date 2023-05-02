import { DemoProvider } from "../contexts/DemoContext";
import { ConfigureModalProvider } from "../modal/ConfigureModalContext";
import { usePathfindingStore } from "../stores/pathfinding-store";
import { DemoLayout } from "../ui/DemoLayout";
import { PathfindingModal } from "./PathfindingModal";
import { astarPathfind, bfsPathfind } from "./pathfinding-algorithms";
import { animatePathfinding } from "./pathfinding-visualizer";
import usePathfindingGrid from "./usePathfindingGrid";

const GRID_ROWS = 23;
const ANIMATION_SPEED = 10;

export default function PathfindingDemo() {
  const {
    GridElements,
    grid,
    sourceId,
    targetId,
    idFromIndex,
    indexFromId,
    resetGridPaint,
    resetGrid,
    animationPlaying,
    visualizationPainted,
  } = usePathfindingGrid(GRID_ROWS);

  const bfsVisualization = async () => {
    resetGridPaint();
    const { path, animationArray } = bfsPathfind(
      grid,
      sourceId,
      targetId,
      idFromIndex,
      indexFromId
    );
    visualizationPainted.current = true;
    await animatePathfinding(
      sourceId,
      targetId,
      path,
      animationArray,
      animationPlaying,
      ANIMATION_SPEED
    );
  };

  const astarVisualization = async () => {
    resetGridPaint();
    const { path, animationArray } = astarPathfind(
      grid,
      sourceId,
      targetId,
      idFromIndex,
      indexFromId
    );
    visualizationPainted.current = true;
    await animatePathfinding(
      sourceId,
      targetId,
      path,
      animationArray,
      animationPlaying,
      ANIMATION_SPEED
    );
    await Promise.resolve();
  };

  const getVisualizer = () => {
    if (usePathfindingStore.getState() === "bfs") {
      return bfsVisualization();
    }
    return astarVisualization();
  };

  return (
    <DemoProvider visualize={getVisualizer}>
      <ConfigureModalProvider modal={PathfindingModal(resetGrid)}>
        <DemoLayout>{GridElements}</DemoLayout>
      </ConfigureModalProvider>
    </DemoProvider>
  );
}
