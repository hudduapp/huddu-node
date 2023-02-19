import utils from "./utils.mjs";
import { Session } from "./_sessions.mjs";

export class Audit {
  constructor(token, baseUrl = "https://audit.huddu.io") {
    this.session = new Session(
      utils.getHeadersFromOneStringToken(token),
      baseUrl
    );
  }

  async createEvent(event, data, relations = []) {
    if (typeof data === typeof "") {
      data = {
        message: data,
      };
    }

    let rawRelations = [];
    relations.forEach((element) => {
      rawRelations.push({
        id: element.id,
        event: element.event,
      });
    });

    let res = await this.session.request("POST", "/events", undefined, {
      event: event,
      data: data,
      relations: rawRelations,
    });

    return new AuditEvent(res.id, event, data, rawRelations, new Date());
  }
}

export class AuditEvent {
  constructor(id, event, data, relations, timestamp) {
    this.id = id;
    this.event = event;
    this.data = data;
    this.relations = relations;
    this.timestamp = timestamp;
  }
}
