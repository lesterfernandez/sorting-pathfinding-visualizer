import { DemoProvider } from "../contexts/DemoContext";
import { ConfigureModalProvider } from "../modal/ConfigureModalContext";
import { DemoLayout } from "../ui/DemoLayout";
import { SortingModal } from "./SortingModal";
import { SortingVisualizer } from "./SortingVisualizer";
import { sortingVisualizer } from "./sorting-visualizer";
import useSortingArray from "./useSortingArray";

export const SortingDemo = () => {
  const array = useSortingArray();

  return (
    <DemoProvider visualize={sortingVisualizer(array)}>
      <ConfigureModalProvider modal={SortingModal}>
        <DemoLayout>
          <SortingVisualizer />
        </DemoLayout>
      </ConfigureModalProvider>
    </DemoProvider>
  );
};
