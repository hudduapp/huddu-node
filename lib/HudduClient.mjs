import { Session } from "./_sessions.mjs";
import { Entries } from "./Entries.mjs";


export class HudduClient {
  constructor({
    token,
    project,
    organization,
    locale = undefined,
    environment = undefined
  } = {}) {
    if (!organization || !project || !token) {
      throw new Error("You have to pass an object to this function which includes an organization, project and a token with a optional locale and environment ")
    }

    // create session
    let baseUrl = "https://api.huddu.io"
    baseUrl = "http://127.0.0.1:8000"
    this.session = new Session(
      {
        "Authorization": "Token " + token
      },
      baseUrl
    );

    // initialize all entities
    this.entries = new Entries({ session: this.session, organization: organization, project: project, locale: locale, environment: environment })

  }


}
