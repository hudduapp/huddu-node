import axios from "axios";

export class Session {
  constructor(headers, baseUrl) {
    this.headers = headers;
    this.baseUrl = baseUrl;
  }
  async request(method, path, params, data) {
    let config;

    if (data) {
      config = {
        method: method.toLowerCase(),
        url: `${this.baseUrl}${path}`,
        headers: this.headers,
        params: params,
        data: data,
      };
    } else {
      config = {
        method: method.toLowerCase(),
        url: `${this.baseUrl}${path}`,
        headers: this.headers,
        params: params,
      };
    }

    let res = {}
    try {
      res = await (
        await axios.request(config)
      ).data


    } catch (error) {
      console.log(error)
      throw new Error("Something went wrong while trying to connect; Full error above")
    }

    return res;
  }
}
