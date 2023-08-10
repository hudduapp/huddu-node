import { Session } from "./_sessions.mjs";
import { Entries } from "./Entries.mjs";
import { Environments } from "./Environments.mjs";
import { Locales } from "./Locales.mjs";

export class HudduClient {
  constructor({
    token,
    project,
    organization,
    locale = undefined,
    environment = undefined,
  } = {}) {
    if (!organization || !project || !token) {
      throw new Error(
        "You have to pass an object to this function which includes an organization, project and a token with a optional locale and environment "
      );
    }

    this.locale = locale;
    this.environment = environment;
    this.project = project;
    this.organization = organization;

    // create session
    let baseUrl = "https://api.huddu.io";
    //baseUrl = "http://127.0.0.1:8000"

    this.session = new Session(
      {
        Authorization: "Token " + token,
      },
      baseUrl
    );
  }

  async init() {
    this.locales = new Locales({
      session: this.session,
      organization: this.organization,
      project: this.project,
    });
    this.environments = new Environments({
      session: this.session,
      organization: this.organization,
      project: this.project,
    });

    if (this.environment && !this.environment.startsWith("env_")) {
      this.environment = await this.environments.get({
        filter: { name: this.environment },
      });
      this.environment = this.environment.id;
    }

    this.entries = new Entries({
      session: this.session,
      organization: this.organization,
      project: this.project,
      locale: this.locale,
      environment: this.environment,
    });
  }
}
