/**
 * @Title 错误统一处理
 * @description 需要继承BaseController类。错误统一分为两种：1.response错误 2.code错误。错误信息配置路径: /config/errpr.config.js。
 *
 * @triggerMode response错误
 *    this.throwResponseError({ status: 302, msg: "资源飞走了" })
 * @triggerMode code错误
 *    this.throwCodeError({ code: 10001, msg: "登录失效，请重新登录", data: null })
 */
'use strict';
module.exports = () => {
  function isError(status) {
    return !/^1\d{2}$/.test(status) && !/^2\d{2}$/.test(status);
  }

  function handlerResponseError(status, msg) {
    const responseStatusList = this.app.config.errorConfig.responseStatus;
    const detail = responseStatusList[status];
    if (detail) {
      msg && (detail.msg = msg);
      this.body = detail;
    } else {
      let finalBody = { msg: '未知的状态码' };
      const responseRegex = this.app.config.errorConfig.responseDefaultMsg;
      Object.entries(responseRegex).forEach(([ regex, value ]) => {
        const reg = new RegExp(regex.slice(1, -1));
        if (reg.test(status)) {
          finalBody = value;
        }
      });
      this.body = finalBody;
    }
  }

  function handlerCodeError(code, msg) {
    const codeStatusList = this.app.config.errorConfig.codeStatus;
    const detail = codeStatusList[code];
    if (detail) {
      msg && (detail.msg = msg);
      this.body = detail;
    }
  }

  return async function notFoundHandler(ctx, next) {
    await next();

    const { status, msg, body } = ctx;
    ctx.set('Content-Type', 'application/json');
    if (isError(status)) {
      handlerResponseError.call(ctx, status, msg);
    } else {
      const { code, msg = '' } = body;
      handlerCodeError.call(ctx, code, msg);
    }
  };
};
