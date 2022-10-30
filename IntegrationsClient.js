const Integrations = require("./Integrations");

class IntegrationsClient {
  constructor(integration_id) {
    this.Integrations = new Integrations(integration_id);
  }
}
module.exports = IntegrationsClient;
