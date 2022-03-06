interface Status {
  key: number;
  value: string;
}

const statusList: Array<Status> = [
  { key: 0, value: "全部" },
  { key: 1, value: "正常" },
  { key: 2, value: "停用" },
];

export { statusList };
