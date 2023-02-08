export class StoreError extends Error {
  constructor(message) {
    super(message);
    this.name = "StoreError";
  }
}

export class DriveError extends Error {
  constructor(message) {
    super(message);
    this.name = "DriveError";
  }
}
