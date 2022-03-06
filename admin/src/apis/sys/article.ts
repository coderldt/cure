import http from "../http";

export interface Params {
  title?: string;
  pageNum: number;
  pageSize: number;
}

export interface Article {
  id?: number | string;
  title?: string;
  content?: string;
}

export function getData(data: Params) {
  return http.post({ url: "/article/list", data });
}

export function del(id: number) {
  return http.post({ url: "/article/delete", data: { id } });
}

export function add(data: Article) {
  return http.post({ url: "/article/add", data });
}

export function update(data: Article) {
  return http.post({ url: "/article/update", data });
}
