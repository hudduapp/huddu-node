import { Session } from "./_sessions.mjs";

export class Queue {
  constructor(client_id, client_secret, baseUrl = "https://queue.huddu.io") {
    this.session = new Session(
      {
        "X-Client-ID": client_id,
        "X-Client-Secret": client_secret,
      },
      baseUrl
    );
  }

  async push(topic, data) {
    await this.session.request("POST", "/push", undefined, {
      topic,
      data,
    });
  }

  async acknowledge(topic, ids) {
    await this.session.request("POST", "/acknowledge", undefined, {
      topic,
      ids
    });
  }

  async *pullAll(topic) {
    let hasMore = true;
    let skip = 0;
    let events = [];

    while (hasMore) {
      events = await this.pull(topic, 25, skip);
      skip += 25;

      if (!events.length) {
        hasMore = false;
      }
      for (let index = 0; index < events.length; index++) {
        const element = events[index];
        yield element
      }
    }
  }
  async pull(topic, limit = 25, skip = 0) {
    let events = await this.session.request("GET", "/pull", {
      topic,
      limit,
      skip,
    });
    let res = [];
    let formattedRes = [];

    res = events.data;
    res.forEach(element => {
      formattedRes.push(
        Object.assign({}, element.data, { "_id": element.id, "_created": element.created, })
      )
    });

    return res;
  }
}
