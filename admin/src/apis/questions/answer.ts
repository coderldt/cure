import http from "../http";

export interface Params {
  typeId: string | number;
}

export interface Subject {
  id?: number | string;
  score?: number;
  typeId?: string;
  content?: string;
  direction?: number;
}

export function getData(data: Params) {
  return http.post({ url: "/subjectAnalysis/list", data });
}

export function dele(id: number) {
  return http.post({ url: "/subjectAnalysis/delete", data: { id } });
}

export function add(data: Subject) {
  return http.post({ url: "/subjectAnalysis/add", data });
}

export function update(data: Subject) {
  return http.post({ url: "/subjectAnalysis/update", data });
}
