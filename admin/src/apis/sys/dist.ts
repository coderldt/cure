import http from "../http";

export interface Params {
  id?: number | string;
  label?: string;
  value?: string;
}

export function getData() {
  return http.post({ url: "/dict/list" });
}

export function del(id: number) {
  return http.post({ url: "/dict/delete", data: { id } });
}

export function add(data: Params) {
  return http.post({ url: "/dict/add", data });
}

export function update(data: Params) {
  return http.post({ url: "/dict/update", data });
}

// 二级子类
export interface ChildrenList {
  parentId?: number | string;
  label?: string;
  value?: string;
}

export function getChildrenData(id: number) {
  return http.post({ url: "/dictChildren/list", data: { id } });
}

export function childrenDel(value: string) {
  return http.post({ url: "/dictChildren/delete", data: { value } });
}

export function childrenAdd(data: Params) {
  return http.post({ url: "/dictChildren/add", data });
}
