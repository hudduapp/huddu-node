export class Entries {
  constructor({ session, organization, project, locale, environment } = {}) {
    this.session = session;
    this.project = project;
    this.organization = organization;
    this.environment = environment;
    this.locale = locale;
  }

  async get({ filter = {} } = {}) {
    if (this.environment) {
      filter.environment = this.environment;
    }

    let res = await this.session.request(
      "GET",
      `/organizations/${this.organization}/projects/${this.project}/entries`,
      { filter: JSON.stringify(filter), limit: 1 }
    );

    if (res.data.length) {
      let entry = res.data[0];
      let locale = this.locale;

      entry.getField = function (fieldId) {
        let field = entry.fields[fieldId];

        try {
          return field[locale];
        } catch (error) {
          throw new Error("Field not found for locale");
        }
      };

      return entry;
    } else {
      return null;
    }
  }

  async list({ filter = {}, skip = 0, limit = 30 } = {}) {
    if (this.environment) {
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

    return res;
  }
}
