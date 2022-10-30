const utils = require("./utils");

class Integrations {
  constructor(integrations_id) {
    this.integrations_id = integrations_id;
  }

  authorize(secret, code) {
    let payload = {
      secret: secret,
      code: code,
    };

    return utils._request_without_token(
      "POST",
      "/integrations/" + this.integrations_id + "/authorize",
      payload
    );
  }

  refresh_token(token, refresh_token) {
    let payload = {
      token: token,
      refresh_token: refresh_token,
    };

    return utils._request_without_token(
      "POST",
      "/integrations/" + this.integrations_id + "/refresh_token",
      payload
    );
  }
}

module.exports = Integrations;
