export default {
  getHeadersFromOneStringToken(token) {
    let headers = {};

    let keyValuePairs = token.split(",");

    keyValuePairs.forEach((element) => {
      headers[element.split("=")[0]] = element.split("=")[1];
    });

    return headers;
  },
};
