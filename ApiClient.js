const Accounts = require("./Accounts");
const Projects = require("./Projects");
const Streams = require("./Streams");
const Events = require("./Events");

class ApiClient {
  constructor(api_key) {
    this.Accounts = new Accounts(api_key);

    this.Projects = new Projects(api_key);

    this.Streams = new Streams(api_key);

    this.Events = new Events(api_key);
  }
}
module.exports = ApiClient;
