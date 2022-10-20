const ApiClient = require("./ApiClient.js");

let project_id = "6979386863354290176"; // todo: replace as needed
let stream_id = "6987388048929628160"; // todo: replace as needed
let account_id = "6966809249058037760"; // todo: replace as needed
let event_id = "6987851870576484352"; // todo: replace as needed
let installation_id = "6987366675922460672"; // todo: replace as needed

let cl = new ApiClient("<integration_api_key>");

// ACCOUNTS

// get account
cl.Accounts.get(account_id).then((res) => {
  console.log(res.data);
});

// PROJECTS
// list projects
cl.Projects.list(account_id).then((res) => {
  console.log(res.data);
});

// get project
cl.Projects.get(project_id, account_id).then((res) => {
  console.log(res.data);
});

// STREAMS

// list streams
cl.Streams.list(project_id, account_id).then((res) => {
  console.log(res.data);
});

// get stream
cl.Streams.get(stream_id, project_id, account_id).then((res) => {
  console.log(res.data);
});

// create stream
cl.Streams.create(project_id, account_id, "new_stream").then((res) => {
  console.log(res.data);
});

// list versions
cl.Streams.list_versions(stream_id, project_id, account_id).then((res) => {
  console.log(res.data);
});

// create stream version

cl.Streams.create_version(
  stream_id,
  project_id,
  account_id,
  Math.floor(Math.random() * 10000)
).then((res) => {
  console.log(res.data);
});

// EVENTS

// list events
cl.Events.list(account_id, project_id, stream_id).then((res) => {
  console.log(res.data);
});

// get event
cl.Events.get(event_id, account_id, project_id, stream_id).then((res) => {
  console.log(res.data);
});

// search events

cl.Events.search(account_id, project_id, stream_id, {
  "data.example": { $regex: "string " },
}).then((res) => {
  console.log(res.data);
});

// create event

cl.Events.create(account_id, project_id, stream_id, undefined, {
  data: "[err] on line 100",
}).then((res) => {
  console.log(res.data);
});

// batch create event

cl.Events.create(account_id, project_id, stream_id, [
  { data: "[err] on line 100" },
  { data: "[err] on line 100" },
]).then((res) => {
  console.log(res.data);
});

// INSTALLATIONS

// list all installations
cl.Installations.list().then((res) => {
  console.log(res.data);
});

// get installation
cl.Installations.get(installation_id).then((res) => {
  console.log(res.data);
});

// update installation
cl.Installations.update(installation_id, { key: "value" }).then((res) => {
  console.log(res.data);
});
