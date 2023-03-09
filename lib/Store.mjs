import utils from "./utils.mjs";
import { StoreError } from "./_exceptions.mjs";
import { Session } from "./_sessions.mjs";

export class Store {
  constructor(client_id, client_secret, baseUrl = "https://store.huddu.io") {
    this.session = new Session(
      {
        "X-Client-ID": client_id,
        "X-Client-Secret": client_secret,
      },
      baseUrl
    );
  }

  async put(key, value, safe = true) {
    if ((await this.get(key)) && safe) {
      throw new StoreError("Another entry with the same key already exists");
    } else {
      await this.session.request("POST", "/documents", undefined, {
        key: key,
        value: JSON.stringify(value),
      });
    }
  }

  async update(key, value) {
    await this.put(key, value, false);
  }

  async list(limit = 25, skip = 0) {
    let documents = await this.session.request("GET", "/documents", {
      limit,
      skip,
    });
    let res = [];
    documents.data.forEach((element) => {
      try {
        try {
          res.push(JSON.parse(element.value));
        } catch (error) {
          res.push(eval(element.value));
        }
      } catch (error) {
        res.push(element.value);
      }
    });
    return res;
  }

  async get(key) {
    let res = await this.session.request("GET", "/documents", {
      key: key,
    });

    if (!res) {
      return null;
    } else {
      try {
        try {
          return JSON.parse(res.value);
        } catch (error) {
          return eval(res.value);
        }
      } catch (error) {
        return res.value;
      }
    }
  }

  async delete(key) {
    await this.session.request("DELETE", "/documents", undefined, {
      key: key,
    });
  }
}
