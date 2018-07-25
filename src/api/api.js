window.api = api;

const APP_KEY =
  "d5535afc8896c42454b98f05b803806cf6d99215dba4430ac281b72445f9f55e";
const BASE_API = "http://mock.biaoyansu.com/api/1/";

function sign(app_key, timestamp) {
  return btoa(app_key + timestamp);
}

function api(url, params) {
  let timestamp = new Date().getTime();
  let signature = sign(APP_KEY, timestamp);

  let opt = {
    headers: {
      "biao-mock-app-key": APP_KEY,
      "biao-mock-timestamp": timestamp,
      "biao-mock-signature": signature
    }
  };

  url = BASE_API + url;
  return axios.post(url, params, opt).then(r => {
    return r.data;
  });
}
