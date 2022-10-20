const utils = require("./utils");

class Events {
  constructor(api_key) {
    this.api_key = api_key;
  }
  list(account, project, stream, skip = 0, limit = 25) {
    return utils._request(
      this.api_key,
      "GET",
      "/accounts/" +
        account +
        "/projects/" +
        project +
        "/streams/" +
        stream +
        "/events",
      { skip: skip, limit: limit }
    );
  }

  search(account, project, stream, query, skip = 0, limit = 25) {
    let payload = { limit: limit, skip: skip, query: query };

    return utils._request(
      this.api_key,
      "POST",
      "/accounts/" +
        account +
        "/projects/" +
        project +
        "/streams/" +
        stream +
        "/events/search",
      undefined,
      payload
    );
  }

  get(id, account, project, stream) {
    return utils._request(
      this.api_key,
      "GET",
      "/accounts/" +
        account +
        "/projects/" +
        project +
        "/streams/" +
        stream +
        "/events/" +
        id
    );
  }

  create(account, project, stream, batch = undefined, data = undefined) {
    let payload = {};
    if (data) {
      payload["data"] = data;
    }

    if (batch) {
      payload["batch"] = batch;
    }

    if (!batch && !data) {
      throw "One of data or batch is required.";
    }

    return utils._request(
      this.api_key,
      "POST",
      "/accounts/" +
        account +
        "/projects/" +
        project +
        "/streams/" +
        stream +
        "/events",
      undefined,
      payload
    );
  }
  update(account, project, stream, event, meta) {
    let payload = {};
    if (meta) {
      payload["meta"] = meta;
    }

    return utils._request(
      this.api_key,
      "PUT",
      "/accounts/" +
        account +
        "/projects/" +
        project +
        "/streams/" +
        stream +
        "/events/{event}",
      undefined,
      payload
    );
  }
}

module.exports = Events;
