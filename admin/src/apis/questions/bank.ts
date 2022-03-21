import http from "../http";

export interface Params {
  title?: string;
  typeId?: string;
  pageNum: number;
  pageSize: number;
}

export interface Subject {
  id?: number | string;
  title?: string;
  typeId?: string;
}

export function getData(data: Params) {
  return http.post({ url: "/testSubject/list", data });
}

export function getAnswer(data: any) {
  return http.post({ url: "/subjectAnalysis/list", data });
}

export function del(id: number) {
  return http.post({ url: "/testSubject/delete", data: { id } });
}

export function add(data: Subject) {
  return http.post({ url: "/testSubject/add", data });
}

export function update(data: Subject) {
  return http.post({ url: "/testSubject/update", data });
}
