import { MutableRefObject } from "react";

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
      // since the timeouts are created all in the same closure, I need to give each one a unique "current" value
      {
        const localCurrent = current;
        setTimeout(() => {
          const element = document.getElementById(String(localCurrent)) as HTMLDivElement;
          element.classList.remove("bg-blue-300");
          element.classList.add("bg-red-300");
          if (String(localCurrent) === String(sourceId)) {
            console.log("done");
            animationPlaying.current = false;
            resolve();
          }
        }, iteration * speed);
        iteration++;
      }
    }
  });

export const animateBfs = async (
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
        element.classList.add("bg-blue-300");
        element.classList.remove("bg-white");
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
