import utils from "./utils.mjs";
import { StoreError } from "./_exceptions.mjs";
import { Session } from "./_sessions.mjs";

export class Store {
  constructor(token, baseUrl = "https://store.huddu.io") {
    this.session = new Session(
      utils.getHeadersFromOneStringToken(token),
      baseUrl
    );
  }

  async put(id, data, safe = true) {
    if ((await this.get(id)) && safe) {
      throw StoreError("Another entry with the same id already exists");
    } else {
      await this.session.request("POST", "/documents", undefined, {
        items: [{ id: id, data: JSON.stringify(data) }],
      });
    }
  }

  async update(id, data) {
    await this.put(id, data, false);
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
          res.push(JSON.parse(element.data));
        } catch (error) {
          res.push(eval(element.data));
        }
      } catch (error) {
        res.push(element.data);
      }
    });
    return res;
  }

  async get(id) {
    let res = await this.session.request("GET", "/documents", {
      ids: id,
    });

    if (res.data.length == 0) {
      return null;
    } else {
      try {
        try {
          return JSON.parse(res.data[0].data);
        } catch (error) {
          return eval(res.data[0].data);
        }
      } catch (error) {
        return res.data[0].data;
      }
    }
  }

  async delete(id) {
    await this.session.request("DELETE", "/documents", undefined, {
      ids: [id],
    });
  }
}
