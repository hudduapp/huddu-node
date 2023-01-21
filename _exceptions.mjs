export class StoreError extends Error {
  constructor(message) {
    super(message);
    this.name = "StoreError";
  }
}
