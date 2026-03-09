import axios, { type AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import i18n from "./i18n/base.ts";
import router from "@/router/";
const api = axios.create({
  timeout: 50000,
  baseURL: import.meta.env.VITE_APP_API,
  headers: {
    "Content-Type": "application/json",
    authorization: "",
  },
});

/**
 * Request
 */
api.interceptors.request.use(
  (config) => {
    config.headers.version = "0.0.1";
    config.headers.timestamp = new Date().getTime();
    config.headers["os"] = 0;
    config.headers["organize"] = "1ae31eef17514cdaae6b310c31a8ec1a";
    config.headers["app"] =
      router.currentRoute.value.fullPath.indexOf("/main") === 0 ? 1 : 0;
    config.headers["authorization"] = "27b546d5ab914f4c8a56183c82850cab";
    const contentType =
      config.headers["Content-Type"] || config.headers["content-type"];

    if (contentType === "multipart/form-data") {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Response
 */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code === 13010004) {
      const url = `${router.currentRoute.value.fullPath.indexOf("/main") === 0 ? "/main" : ""}/passport`;
      if (router.currentRoute.value.path !== url) {
        location.href = url;
      }
      return Promise.reject(response.data.message);
    }
    return response;
  },
  (error) => {
    ElMessage({
      type: "error",
      message: i18n.global.t("errorCode.networkError"),
    });
    return Promise.reject(error);
  },
);

export default api;
