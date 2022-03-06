import axios, { AxiosInstance, AxiosPromise } from "axios";
import { ElMessage } from "element-plus";
import router from "@/router/index";
import { getStore } from "@/utils/store";

interface HttpHeaders {
  token?: string;
  [propertys: string]: any;
}

interface Params {
  url: string;
  headers?: HttpHeaders;
  data?: {};
  method?: "GET" | "POST";
  params?: {} | null;
}

const ajax: AxiosInstance = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json;charset=UTF-8",
  },
});

// 请求拦截器，内部根据返回值，重新组装，统一管理。
ajax.interceptors.response.use((res) => {
  if (typeof res.data !== "object") {
    ElMessage.error("服务端异常！");
    return Promise.reject(res);
  }
  if (res.data.code !== 200) {
    if (res.data.message) ElMessage.error(res.data.msg);
    if (res.data.code === 419) {
      router.push({ path: "/login" });
    }
    return Promise.reject(res.data);
  }

  return res.data;
});

const http = {
  get: function (params: Params) {
    const { data = {}, url, headers = {} } = params;
    let query = "";
    Object.entries(data).forEach(([key, value]) => {
      query += `${key}=${value}&`;
    });

    if (query) {
      query = query.slice(0, -1);
    }

    return this.http({ url: `/cureApi${url}?${query}`, headers });
  },
  post: function (params: Params) {
    const { data = {}, url, headers = {} } = params;
    return this.http({ method: "POST", url: `/cureApi${url}`, headers, data });
  },
  http: (param: Params): AxiosPromise<Object> => {
    const { method = "GET", url, data, headers = {}, params } = param;
    return new Promise((resolve, reject) => {
      headers["token"] = getStore("token") || "";
      return ajax
        .request({
          method,
          url,
          data,
          headers,
          params,
        })
        .then(
          (res) => {
            resolve(res);
          },
          (error) => {
            console.log(error);
            reject(error);
          }
        );
    });
  },
};

export default http;
