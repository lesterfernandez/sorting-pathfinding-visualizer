import { swap } from "./swap";

export class MaxHeap {
  private heap: number[];

  private size = 0;

  private animations: [number, number][] = [];

  constructor(heap: number[]) {
    this.heap = heap;
    this.heapify();
  }

  public heapify() {
    this.animations = [];
    this.size = this.heap.length;
    for (let i = Math.floor(this.size / 2); i >= 0; i--) {
      this.sink(i);
    }
  }

  private sink(i: number) {
    while (i * 2 + 1 < this.size) {
      let j = i * 2 + 1;
      if (j + 1 < this.size && this.heap[j + 1] > this.heap[j]) {
        j++;
      }
      if (this.heap[i] > this.heap[j]) {
        break;
      }
      this.animations.push([i, j]);
      swap(this.heap, i, j);
      i = j;
    }
  }

  public heapSort() {
    while (this.size > 0) {
      swap(this.heap, 0, this.size - 1);
      this.animations.push([0, this.size - 1]);
      this.size--;
      this.sink(0);
    }
    return { newArray: this.heap, animations: this.animations };
  }
}
