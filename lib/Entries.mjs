import { Assets } from "./Assets.mjs";

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

    this.followLinks({ data: res, includes: res.includes });
    return res;
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
    res.data.forEach((element) => {
      this.followLinks({ data: element, includes: res.includes });
    });

    return res;
  }

  followLinks({ data, includes } = {}) {
    let fields = [
      "entry",
      "asset",
      "model",
      "locale",
      "environment",

      "organization",
      "project",
      "account",
    ];

    if (typeof data == "object") {
      Object.keys(data).forEach((element) => {
        if (
          fields.includes(element) &&
          !data.followed &&
          !data[element].followed
        ) {
          // JESUS!!!

          let dataType = element.slice(0, 1).toUpperCase() + element.slice(1);

          // tldr:set data[key of field in fields] equal to includes[data type].filter(filter for the id of data[key of field in fields] equal to the current elements id) and take the first element of the remaining list
          //check if datatype exists in includes is required; because this function might run over already followed links
          if (includes[dataType]) {
            console.log(data[element]);
            data[element] = includes[dataType].filter(
              (e) => (e.id = data[element])
            )[0];
            data[element].followed = true;
          }
        }
        //make it recursive
        if (Array.isArray(data[element])) {
          data[element].forEach((nestedElement) => {
            this.followLinks({
              data: data[element][data[element].indexOf(nestedElement)],
              includes: includes,
            });
          });
        } else if (typeof data[element] == "object" && data[element]) {
          this.followLinks({ data: data[element], includes: includes });
        }
      });
    }
  }
}
