import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/";

const publicApi = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

async function getData<T>(url: string): Promise<T> {
  const resp = await publicApi.get(url);
  return resp.data;
}
async function postData<T>(url: string, data: any): Promise<T> {
  const resp = await publicApi.post(url, data);
  return resp.data;
}

export { publicApi, getData, postData };
