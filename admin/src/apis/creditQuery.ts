import http from "./http";

interface CreditQuery {
  name: string;
}

export function getCreditDetail(params: CreditQuery) {
  return http.get({ url: "/data/creditQuery.json", data: params });
}
