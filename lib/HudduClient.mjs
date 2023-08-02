import { Session } from "./_sessions.mjs";
import { Entries } from "./Entries.mjs";


export class HudduClient {
  constructor({
    token,
    organization,
    project,
    locale = undefined,
    environment = undefined
  } = {}) {
    if (!organization || !project || !token) {
      throw new Error("You have to pass an object to this function which includes an organization, project and a token with a optional locale and environment ")
    }

    this.organization = organization
    this.project = project
    // create session
    let baseUrl = "https://api.huddu.io"

    this.session = new Session(
      {
        "Authorization": "Token " + token
      },
      baseUrl
    );

    // initialize all entities
    this.entries = new Entries({ session: this.session, organization: this.organization, project: this.project, locale: locale, environment: environment })

  }


}
