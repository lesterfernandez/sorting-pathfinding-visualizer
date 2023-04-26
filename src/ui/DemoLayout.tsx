import { ReactNode } from "react";
import { DemoTopBar } from "./DemoTopBar";
import { VisualizerContainer } from "./VisualizerContainer";

interface Props {
  children: ReactNode;
}

export function DemoLayout({ children }: Props) {
  return (
    <main className="flex h-screen w-screen flex-col">
      <h1 className="pt-10 pb-14 text-center text-4xl font-medium text-blue-500">
        Algorithm Visualizer
      </h1>
      <section className="flex max-h-[1000px] w-full max-w-screen-lg flex-grow flex-col px-2 pb-2 sm:px-8 sm:pb-8 lg:mx-auto">
        <DemoTopBar />
        <VisualizerContainer>{children}</VisualizerContainer>
      </section>
    </main>
  );
}
