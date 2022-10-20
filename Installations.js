const utils = require("./utils");

class Accounts {
  constructor(api_key) {
    this.api_key = api_key;
  }

  list(skip = 0, limit = 25, code = undefined) {
    params = {
      skip: skip,
      limit: limit,
    };

    if (code) {
      params.code = code;
    }

    return utils._request(this.api_key, "GET", "/installations", params);
  }

  get(id) {
    return utils._request(this.api_key, "GET", "/installations/" + id);
  }

  update(id, meta = {}) {
    payload = {};

    if (meta) {
      payload.meta = meta;
    }

    return utils._request(
      this.api_key,
      "GET",
      "/installations/" + id,
      undefined,
      payload
    );
  }
}

module.exports = Accounts;
