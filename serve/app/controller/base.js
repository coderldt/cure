'use strict';

// 创建基类控制器

const Controller = require('egg').Controller;
const UUID = require('uuid');// 新增uuid时需使用  UUID.v1()方法根据时间戳生成随机id


class BaseController extends Controller {
  // constructor(ctx) {
  //   super(ctx);
  // }

  uuid() {
    return UUID.v1();
  }

  // response 错误
  async throwResponseError({ status = 500, msg = '' }) {
    this.ctx.status = status;
    this.ctx.msg = msg;
  }

  // code错误
  error({ code = 500, msg = '失败', data = null }) {
    this.ctx.body = {
      code,
      msg,
      data,
    };
  }

  // 成功
  success({ msg = '成功', data = null }) {
    this.ctx.body = {
      code: 200,
      msg,
      data,
    };
  }
}

module.exports = BaseController;
