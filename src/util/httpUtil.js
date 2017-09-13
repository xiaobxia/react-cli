import axios from 'axios';
import qs from 'qs';
const basePath = '/your-business/';
function makeUrl(url) {
  if (url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  } else {
    return `${basePath}${url}`;
  }
}

const Http = {
  get (url, options) {
    return axios.get(makeUrl(url), options).then(data => data.data.result);
  },

  getRaw (url, options) {
    return axios.get(makeUrl(url), options);
  },

  post (url, param, options) {
    return axios.post(makeUrl(url), qs.stringify(param), options).then(data => data.data.result);
  },

  postRaw (url, param, options) {
    return axios.post(makeUrl(url), qs.stringify(param), options);
  },

  postJSON (url, param, options) {
    return axios.post(makeUrl(url), param, options).then(data => data.data.result);
  },

  postJSONRaw (url, param, options) {
    return axios.post(makeUrl(url), param, options);
  },

  delete (url, options) {
    return axios.delete(makeUrl(url), options).then(data => data.data.result);
  },

  deleteRaw (url, options) {
    return axios.delete(makeUrl(url), options);
  },

  jsonp (url, options) {
    return axios.jsonp(makeUrl(url), options);
  },
  generateUrl (url) {
    return makeUrl(url);
  }
};

export default Http;
