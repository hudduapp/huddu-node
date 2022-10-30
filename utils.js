const axios = require("axios");

module.exports = {
  _request: function (
    api_key,
    method,
    url,
    params = undefined,
    data = undefined
  ) {
    headers = {
      Authorization: "Token " + api_key,
    };

    const base_url = "https://api.huddu.io";

    let final_url = base_url + url;

    if (data) {
      config = {
        method: method.toLowerCase(),
        url: final_url,
        headers: headers,
        params: params,
        data: data,
      };
    } else {
      config = {
        method: method.toLowerCase(),
        url: final_url,
        headers: headers,
        params: params,
      };
    }
    return axios.request(config).catch((err) => {
      console.log(final_url);
      console.log(err.response.data);
      Promise.reject();
    });
  },
  _request_without_token: function (
    method,
    url,
    params = undefined,
    data = undefined
  ) {
    headers = {};

    const base_url = "https://api.huddu.io";

    let final_url = base_url + url;

    if (data) {
      config = {
        method: method.toLowerCase(),
        url: final_url,
        headers: headers,
        params: params,
        data: data,
      };
    } else {
      config = {
        method: method.toLowerCase(),
        url: final_url,
        headers: headers,
        params: params,
      };
    }
    return axios.request(config).catch((err) => {
      console.log(final_url);
      console.log(err.response.data);
      Promise.reject();
    });
  },
};
