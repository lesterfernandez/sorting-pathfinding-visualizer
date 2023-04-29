export default class Queue<T> {
  private size = 0;
  private head?: null | Node<T>;
  private tail?: Node<T>;

  add(val: T) {
    this.size++;
    const node = new Node(val);
    if (this.tail) {
      this.tail.next = node;
    }
    this.tail = node;
    if (!this.head) {
      this.head = node;
    }
  }

  remove() {
    if (!this.head) {
      throw new Error("Queue is empty. Invalid operation 'remove'.");
    }
    const val = this.head.val;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = undefined;
    }
    this.size--;
    return val;
  }

  isEmpty() {
    return this.size === 0;
  }
}

class Node<T> {
  next?: Node<T>;
  val: T;

  constructor(val: T, next?: Node<T>) {
    this.next = next;
    this.val = val;
  }
}
