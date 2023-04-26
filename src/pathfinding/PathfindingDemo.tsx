import { PointerEventHandler, useRef } from "react";
import { ConfigureModalProvider } from "../modal/ConfigureModalContext";
import { SortingModal } from "../sorting/SortingModal";
import { DemoLayout } from "../ui/DemoLayout";

export default function PathfindingDemo() {
  const processed = useRef(new Set<string>());
  const dragging = useRef(false);
  const placing = useRef(true);

  const handlePointerOver: PointerEventHandler<HTMLDivElement> = e => {
    if (!dragging.current || processed.current.has(e.currentTarget.id)) return;
    setBlock(e.currentTarget);
    processed.current.add(e.currentTarget.id);
  };

  const handlePointerDown: PointerEventHandler<HTMLDivElement> = e => {
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
    if (placing.current && element.classList.contains("bg-white")) {
      element.classList.remove("bg-white");
      element.classList.add("bg-amber-100");
    } else if (!placing.current && element.classList.contains("bg-amber-100")) {
      element.classList.remove("bg-amber-100");
      element.classList.add("bg-white");
    }
  };

  const isBlockEmpty = (element: HTMLDivElement) => element.classList.contains("bg-white");

  return (
    <ConfigureModalProvider modal={SortingModal}>
      <DemoLayout>
        <div
          className="absolute inset-0 grid auto-rows-min grid-cols-[repeat(auto-fit,_minmax(42px,_1fr))] gap-0 overflow-hidden"
          onPointerLeave={disableDrawing}
        >
          {Array.from({ length: 484 }).map((_, i) => (
            <div
              id={`${i}`}
              key={`pf-${i}`}
              onPointerDown={handlePointerDown}
              onPointerOver={handlePointerOver}
              onPointerUp={disableDrawing}
              onPointerCancel={disableDrawing}
              className="h-[42px] touch-none select-none bg-white outline outline-1 outline-black"
              // style={{ background: "white" }}
            ></div>
          ))}
        </div>
      </DemoLayout>
    </ConfigureModalProvider>
  );
}
