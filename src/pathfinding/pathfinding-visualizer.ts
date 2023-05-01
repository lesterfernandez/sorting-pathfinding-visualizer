import { MutableRefObject } from "react";

const drawPathNode = (div: HTMLDivElement) => {
  div.classList.remove("bg-blue-300");
  div.classList.add("bg-red-300");
};

const drawSearchedNode = (div: HTMLDivElement) => {
  div.classList.add("bg-blue-300");
  div.classList.remove("bg-white");
};

export const drawPath = (
  sourceId: number,
  targetId: number,
  path: Map<number, number>,
  animationPlaying: MutableRefObject<boolean>,
  speed: number
) =>
  new Promise<void>(resolve => {
    let current = targetId as number;
    let iteration = 1;

    while (current !== sourceId) {
      current = path.get(current) as number;
      // the timeout functions were all reading the same values because they shared a closure and are executed asynchronously
      // ...hence the new block
      {
        const localCurrent = current;
        setTimeout(() => {
          const element = document.getElementById(String(localCurrent)) as HTMLDivElement;
          drawPathNode(element);
          if (String(localCurrent) === String(sourceId)) {
            console.log("done", iteration);
            animationPlaying.current = false;
            resolve();
          }
        }, iteration * speed);
        iteration++;
      }
    }
  });

export const animatePathfinding = async (
  sourceId: number,
  targetId: number,
  path: Map<number, number>,
  animationArray: number[],
  animationPlaying: MutableRefObject<boolean>,
  speed: number
) => {
  animationPlaying.current = true;

  await new Promise<void>(resolve => {
    animationArray.forEach((id, iteration) => {
      setTimeout(() => {
        const element = document.getElementById(String(id)) as HTMLDivElement;
        drawSearchedNode(element);
        if (iteration === animationArray.length - 1) {
          resolve();
        }
      }, iteration * speed);
    });
  });

  if (!path.has(targetId)) {
    animationPlaying.current = false;
    return;
  }

  await drawPath(sourceId, targetId, path, animationPlaying, speed);
};
