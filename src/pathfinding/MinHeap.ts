export class MinHeap<T> {
  private heap: HeapNode<T>[];
  private size: number;

  constructor() {
    this.size = 0;
    this.heap = [];
  }

  add(value: T, priority: number) {
    this.size++;
    this.heap.push(new HeapNode(value, priority));
    this.swim(this.size - 1);
  }

  remove() {
    const value = this.heap[0].value;
    this.swap(0, this.size - 1);
    this.heap.pop();
    this.size--;
    this.sink(0);
    return value;
  }

  isEmpty() {
    return this.size === 0;
  }

  private swim(current: number) {
    let parent = Math.floor((current - 1) / 2);
    while (parent >= 0 && this.heap[parent].compareTo(this.heap[current]) >= 0) {
      this.swap(current, parent);
      current = parent;
      parent = Math.floor((current - 1) / 2);
    }
  }

  private sink(current: number) {
    while (current * 2 + 1 < this.size) {
      let child = current * 2 + 1;
      if (child + 1 < this.size && this.heap[child + 1].compareTo(this.heap[child]) <= 0) child++;
      if (this.heap[current].compareTo(this.heap[child]) <= 0) break;
      this.swap(current, child);
      current = child;
    }
  }

  private swap(i: number, j: number) {
    const tmp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = tmp;
  }
}

class HeapNode<T> {
  constructor(public value: T, public priority: number) {}

  public compareTo(other: HeapNode<T>) {
    return this.priority - other.priority;
  }
}
