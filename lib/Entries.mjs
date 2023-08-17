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

    if (res.data.length) {
      let entry = res.data[0];
      // loop over fields

      for (const fieldKey of Object.keys(entry.fields)) {
        // loop over locales in field

        for await (const localeKey of Object.keys(entry.fields[fieldKey])) {
          if (entry.fields[fieldKey][localeKey].type == "Link") {
            if (entry.fields[fieldKey][localeKey].link_type == "Asset") {
              entry.fields[fieldKey][localeKey] = await this.assets.get({
                filter: {
                  id: entry.fields[fieldKey][localeKey].id,
                },
              });
            }
          }
        }

        if (entry.fields[fieldKey].entries) {
          let entries = [];

          for await (const elem of entry.fields[fieldKey].entries) {
            entries.push(
              await this.get({
                filter: { id: elem.id, environment: "SEE_ROOT" },
              })
            );
          }

          entry.fields[fieldKey].entries = entries;
        }
      }

      return entry;
    } else {
      return null;
    }
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

    for await (const element of res.data) {
      for (const fieldKey of Object.keys(element.fields)) {
        // loop over locales in field

        for await (const localeKey of Object.keys(element.fields[fieldKey])) {
          if (element.fields[fieldKey][localeKey].type == "Link") {
            if (element.fields[fieldKey][localeKey].link_type == "Asset") {
              element.fields[fieldKey][localeKey] = await this.assets.get({
                filter: {
                  id: element.fields[fieldKey][localeKey].id,
                },
              });
            }
          }
        }

        if (element.fields[fieldKey].entries) {
          let entries = [];

          for await (const elem of element.fields[fieldKey].entries) {
            entries.push(
              await this.get({
                filter: { id: elem.id, environment: "SEE_ROOT" },
              })
            );
          }

          element.fields[fieldKey].entries = entries;
        }
      }
    }
    return res;
  }
}
