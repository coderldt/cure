'use strict';
const BaseController = require('../base');

class StarController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service.question.star;
  }

  async list() {
    const { id } = this.ctx.userinfo;

    const resList = await this.service.query({ userId: id });
    this.success({ data: resList });
  }

  // 同感
  async update() {
    const { questionId } = this.ctx.request.body;
    if (!questionId) {
      return this.error({ msg: '请选择一个提问' });
    }

    const { id } = this.ctx.userinfo;
    const params = {
      userId: id,
      questionId,
    };

    const resList = await this.service.query(params);
    if (resList.length) {
      await this.service.cDelData({ id: resList[0].id });
      this.success({ msg: '取消同感成功' });
    } else {
      const res = await this.service.add(params);
      if (res.code === 200) {
        this.success({ data: res.data, msg: '同感成功' });
      } else {
        this.error({ msg: '出错了，请稍后再试' });
      }
    }
  }
}

module.exports = StarController;
