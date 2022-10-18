const utils = require("./utils");

class Accounts {
  constructor(api_key) {
    this.api_key = api_key;
  }

  list_installations(skip = 0, limit = 25) {
    return utils._request(this.api_key, "GET", "/installations", {
      skip: skip,
      limit: limit,
    });
  }

  get(account_id) {
    return utils._request(this.api_key, "GET", "/accounts/" + account_id);
  }
}

module.exports = Accounts;
