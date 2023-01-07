import { ReactNode } from "react";
import { DemoTopBar } from "./DemoTopBar";

interface Props {
  children: ReactNode;
}

export function DemoLayout({ children }: Props) {
  return (
    <main className="flex h-screen w-screen flex-col">
      <h1 className="pt-10 pb-14 text-center text-4xl font-medium text-blue-500">
        Algorithm Visualizer
      </h1>
      <section className="mx-2 mb-2 flex flex-grow flex-col sm:mx-8 sm:mb-8 lg:mx-auto lg:min-w-[1024px]">
        <DemoTopBar />
        <div className="flex-1 rounded-xl border-4 border-amber-100 shadow">
          {children}
        </div>
      </section>
    </main>
  );
}
