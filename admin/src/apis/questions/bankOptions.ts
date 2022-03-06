import http from "../http";

export interface Params {
  subjectId: string | number;
}

export interface Subject {
  id?: number | string;
  desc?: string;
  score: number | string;
  subjectId: number | string;
}

export function getData(data: Params) {
  return http.post({ url: "/subjectAnswer/list", data });
}

export function del(id: number) {
  return http.post({ url: "/subjectAnswer/delete", data: { id } });
}

export function add(data: Subject) {
  return http.post({ url: "/subjectAnswer/add", data });
}

export function update(data: Subject) {
  return http.post({ url: "/subjectAnswer/update", data });
}
