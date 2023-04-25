import { useEffect } from "react";
import { ConfigureModalProvider } from "../modal/ConfigureModalContext";
import { useSortingArray } from "../stores/sorting-store";
import { useVisualize } from "../stores/visualize-store";
import { DemoLayout } from "../ui/DemoLayout";
import { SortingModal } from "./SortingModal";
import { SortingVisualizer } from "./SortingVisualizer";
import { sortingVisualizer } from "./sorting-visualizer";

export const SortingDemo = () => {
  const array = useSortingArray();
  useEffect(() => {
    useVisualize.setState({
      visualize: sortingVisualizer(array),
    });
  }, [array]);

  return (
    <ConfigureModalProvider modal={SortingModal}>
      <DemoLayout>
        <SortingVisualizer />
      </DemoLayout>
    </ConfigureModalProvider>
  );
};
