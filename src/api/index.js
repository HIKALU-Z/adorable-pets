import axios from "axios";

const APP_KEY =
  "d5535afc8896c42454b98f05b803806cf6d99215dba4430ac281b72445f9f55e";
const BASE_API = "http://mock.biaoyansu.com/api/1/";

const sign = (APP_KEY, timestamp) => {
  return btoa(APP_KEY + timestamp);
};

const api = (url, param) => {
  url = BASE_API + url;
  let timestamp = new Date().getTime();
  let signature = sign(APP_KEY, timestamp);
  let opt = {
    headers: {
      "biao-mock-app-key": APP_KEY,
      "biao-mock-timestamp": timestamp,
      "biao-mock-signature": signature
    }
  };
  return axios.post(url, param, opt).then(r => {
    return r.data;
  });
};
export default api;
