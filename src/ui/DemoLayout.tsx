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
      <section className="flex w-full max-w-screen-lg flex-grow flex-col px-2 pb-2 sm:px-8 sm:pb-8 lg:mx-auto">
        <DemoTopBar />
        <div className="rounded-x-xl flex-1 rounded-b-xl border-4 border-amber-100 sm:rounded-t-xl">
          {children}
        </div>
      </section>
    </main>
  );
}
