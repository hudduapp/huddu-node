import { Assets } from "./Assets.mjs";
import { Links } from "./_links.mjs";

export class Entries {
  constructor({ session, organization, project, environment } = {}) {
    this.session = session;
    this.project = project;
    this.organization = organization;
    this.environment = environment;
    this.assets = new Assets({
      session,
      organization,
      project,
    });
  }

  async get({ filter = {} } = {}) {
    if (this.environment && !filter.environment) {
      filter.environment = this.environment;
    }

    let res = await this.session.request(
      "GET",
      `/organizations/${this.organization}/projects/${this.project}/entries`,
      { filter: JSON.stringify(filter), limit: 1 }
    );
    if (res.data && res.data.length) {
      let includes = res.includes;
      res = res.data[0];
      res.includes = includes;
    }

    let linksClient = new Links({
      data: res,
      includes: res.includes,
    });
    return linksClient.run();
  }

  async list({ filter = {}, skip = 0, limit = 30 } = {}) {
    if (this.environment && !filter.environment) {
      filter.environment = this.environment;
    }

    let res = await await this.session.request(
      "GET",
      `/organizations/${this.organization}/projects/${this.project}/entries`,
      {
        filter: JSON.stringify(filter),
        limit: limit,
        skip: skip,
      }
    );
    let finalRes = [];
    res.data.forEach((element) => {
      let linksClient = new Links({
        data: element,
        includes: res.includes,
      });
      finalRes.push(linksClient.run());
    });

    return finalRes;
  }
}
