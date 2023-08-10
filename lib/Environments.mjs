export class Environments {
  constructor({ session, organization, project } = {}) {
    this.session = session;
    this.project = project;
    this.organization = organization;
  }

  async get({ filter = {} } = {}) {
    let res = await this.session.request(
      "GET",
      `/organizations/${this.organization}/projects/${this.project}/environments`,
      { filter: JSON.stringify(filter), limit: 1 }
    );

    if (res.data.length) {
      let entry = res.data[0];
      return entry;
    } else {
      return null;
    }
  }
}
