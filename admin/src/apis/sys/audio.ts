import http from "../http";

export interface Params {
  // title?: string;
  pageNum: number;
  pageSize: number;
}

export interface Audio {
  id?: number | string;
  name?: string;
  url?: string;
  logo?: string;
}

export function getData(data: Params) {
  return http.post({ url: "/audio/list", data });
}

export function del(id: number) {
  return http.post({ url: "/audio/delete", data: { id } });
}

export function add(data: Audio) {
  return http.post({ url: "/audio/add", data });
}

export function update(data: Audio) {
  return http.post({ url: "/audio/update", data });
}
