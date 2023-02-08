import utils from "./utils.mjs";
import { DriveError } from "./_exceptions.mjs";
import { Session } from "./_sessions.mjs";
import fs from "fs";

export class Drive {
  constructor(token, baseUrl = "https://drive.huddu.io") {
    this.session = new Session(
      utils.getHeadersFromOneStringToken(token),
      baseUrl
    );
  }

  async upload(
    name,
    data = undefined,
    path = undefined,
    safe = true,
    chunkSize = 1e7
  ) {
    // read
    if (!safe) {
      throw new DriveError("Another entry with the same id already exists");
    } else {
      let fileData = data;
      if (path) {
        fileData = fs.readFileSync(process.cwd() + "/" + path).toString();
      }
      if (!fileData) {
        throw new DriveError("One of data or path has to be specified");
      }

      let chunks = fileData.match(new RegExp(".{1," + chunkSize + "}", "g"));

      chunks.forEach(async (element) => {
        await this.session.request("POST", "/upload", undefined, {
          name: `${name}__chunk__${chunks.indexOf(element)}`,
          data: element,
        });
      });
    }
  }

  async *readIterator(name) {
    let hasMore = true;
    let run = 0;

    while (hasMore) {
      try {
        let data = await this.session.request("GET", `/${name}__chunk__${run}`);

        if (data.data) {
          yield data.data;
        } else {
          hasMore = false;
        }

        run++;
      } catch (error) {
        hasMore = false;
      }
    }
    return run;
  }
  async read(name) {
    let response = "";

    for await (const i of await this.readIterator(name)) {
      response += i;
    }

    return response;
  }

  async delete(name) {
    let hasMore = true;
    let run = 0;

    while (hasMore) {
      try {
        await this.session.request("DELETE", `/${name}__chunk__${run}`);
        run++;
      } catch (error) {
        hasMore = false;
      }
    }
  }
}
