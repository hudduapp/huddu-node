import { Store } from "./Store.mjs";

let store = new Store(
  "ea6c4d68a74803243d50b9816b685b27b1f4efda7d4979b9f95eae9bc4a9cefc",
  "spc_8ad3b488-5f57-4c58-a697-e5f6ba76d3b5",
  "us-central-1"
);

await store.update("test", 200);
//await store.delete("test");

console.log(await store.get("test"));
