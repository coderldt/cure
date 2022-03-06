'use strict';
const BaseController = require('../base');

class UserController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.resCode = {
      '-1': '系统繁忙，此时请开发者稍候再试',
      40029: 'code无效',
      45011: '登录太频繁，请稍后在登录',
      40226: '该用户风险较高，禁止登录',
      40163: '请重新登录',
    };
    this.service = ctx.service.sys.user; // service
  }

  async login() { // 登录
    const { ctx } = this;
    const { phone, password } = ctx.request.body;
    if (!phone || !password) {
      return this.error({ data: '手机号或者不能为空' });
    }

    const res = await this.service.login({ phone, password });
    if (res.code === 200) {
      this.success({ data: res.data, msg: '登录成功' });
    } else {
      this.error({ msg: res.msg });
    }
  }

  async register() {
    const { phone, password } = this.ctx.request.body;
    if (!phone && !password) {
      return this.error({ data: '手机号或者不能为空' });
    }

    const res = await this.service.add({ phone, password });
    if (res.code === 200) {
      this.success({ msg: '注册成功' });
    } else {
      this.error({ msg: '注册失败' });
    }
  }
}

module.exports = UserController;
