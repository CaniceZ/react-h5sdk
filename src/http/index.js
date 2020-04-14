import axios from "axios";
import qs from "qs";

const http = axios.create();
if(process.env.NODE_ENV != 'production'){
  http.defaults.baseURL = "/api";
}else{
  http.defaults.baseURL = process.env.REACT_APP_HOSTNAME;
}
http.defaults.headers.post["Content-Type"] = "application/json";

http.interceptors.request.use(
  config => {
    console.group("%crequest " + config.url, "color: blue");
    console.log(config);
    console.groupEnd();
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => {
    console.group("%cresponse " + response.config.url, "color: green");
    console.log(response);
    console.groupEnd();
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default {
  get(url, params = {}, options) {
    return http.get(`${url}?${qs.stringify(params)}`, { ...options });
  },
  post(url, params = {}, options) {
    return http.post(url, params, options);
  },
  put(url, params = {}, options) {
    return http.put(url, params, options);
  },
  delete(url, params = {}, options) {
    return http.delete(`${url}?${qs.stringify(params)}`, { ...options });
  }
};
