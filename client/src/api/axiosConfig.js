import axios from "axios";
import { BASE_URL } from "./constants";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(function (config) {
  let token = localStorage.getItem("access_token");
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});

export default instance;
