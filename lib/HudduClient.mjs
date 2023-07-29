import { Session } from "./_sessions.mjs";
import { Entries } from "./Entries.mjs";

export class HudduClient {
  constructor(token, organization, project) {

    if (!organization || !project || !token) {
      throw new Error("You have to pass a token, organization and project to this class (in that order)")
    }


    this.organization = organization
    this.project = project
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
    this.entries = new Entries(this.session, this.organization, this.project)
  }


}
