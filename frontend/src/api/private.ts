import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { publicApi, API_BASE_URL } from "./public";

const privateApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

privateApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

privateApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const ogRequest: any = error.config;
    if (
      (error.response?.status == 401 || error.response?.status == 403) &&
      !ogRequest._retry
    ) {
      ogRequest._retry = true;
      try {
        const refresh = localStorage.getItem("refresh");
        if (!refresh) return Promise.reject("You have to login again");
        const resp = await publicApi.post<{ access: string }>(
          "/token/refresh/",
          {
            refresh: refresh,
          },
        );
        const { access } = resp.data;
        ogRequest.headers.Authorization = `Bearer ${access}`;
        localStorage.setItem("access", access);
        return privateApi(ogRequest);
      } catch (err) {
        localStorage.clear();
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);
