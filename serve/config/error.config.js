
'use strict';
module.exports = {
  // response 错误配置
  responseStatus: {
    404: { code: 404, data: null, msg: '服务器找不到了' },
    403: { code: 403, data: null, msg: '权限不足,请联系管理员!' },
    504: { code: 504, data: null, msg: '请求超时，请重试!' },
  },
  // response 错误默认配置
  responseDefaultMsg: {
    '/^3\\d{2}$/': { status: 300, msg: '资源不知道跑到哪里去了' },
    '/^4\\d{2}$/': { status: 400, msg: '客户端发生了未知的错误' },
    '/^5\\d{2}$/': { status: 500, msg: '服务端发生了未知的错误' },
  },
  // code 错误配置
  codeStatus: {
    10000: { code: 10000, data: null, msg: '无权限访问，请先登录' },
    10001: { code: 10001, data: null, msg: '登录失效，请重新登录' },
    80001: { code: 10002, data: null, msg: '首次登录请先修改密码' },
    80002: { code: 10003, data: null, msg: '您的账号上一次登录未退出' },
  },
};
