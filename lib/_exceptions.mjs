export class StoreError extends Error {
  constructor(message) {
    super(message);
    this.name = "StoreError";
  }
}
export class QueueError extends Error {
  constructor(message) {
    super(message);
    this.name = "QueueError";
  }
}
