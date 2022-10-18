const utils = require("./utils");

class Projects {
  constructor(api_key) {
    this.api_key = api_key;
  }

  list(account, skip = 0, limit = 25) {
    return utils._request(
      this.api_key,
      "GET",
      "/accounts/" + account + "/projects",
      { skip: skip, limit: limit }
    );
  }

  get(id, account) {
    return utils._request(
      this.api_key,
      "GET",
      "/accounts/" + account + "/projects/" + id
    );
  }
}

module.exports = Projects;
