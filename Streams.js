const utils = require("./utils");

class Streams {
  constructor(api_key) {
    this.api_key = api_key;
  }

  list(project, account, skip = 0, limit = 25) {
    return utils._request(
      this.api_key,
      "GET",
      "/accounts/" + account + "/projects/" + project + "/streams",
      { skip: skip, limit: limit }
    );
  }
  get(id, project, account) {
    return utils._request(
      this.api_key,
      "GET",
      "/accounts/" + account + "/projects/" + project + "/streams/" + id + ""
    );
  }

  list_versions(id, project, account) {
    return utils._request(
      this.api_key,
      "GET",
      "/accounts/" +
        account +
        "/projects/" +
        project +
        "/streams/" +
        id +
        "/versions"
    );
  }
  create(project, account, name) {
    return utils._request(
      this.api_key,
      "POST",
      "/accounts/" + account + "/projects/" + project + "/streams",
      undefined,
      { name: name }
    );
  }

  create_version(id, project, account, version = undefined, name = undefined) {
    let payload = {};
    if (name) {
      payload["name"] = name;
    }
    if (version) {
      payload["version"] = version;
    } else {
      payload["version"] = int(time.time());
    }

    return utils._request(
      this.api_key,
      "POST",
      "/accounts/" +
        account +
        "/projects/" +
        project +
        "/streams/" +
        id +
        "/versions",
      undefined,
      payload
    );
  }
}

module.exports = Streams;
