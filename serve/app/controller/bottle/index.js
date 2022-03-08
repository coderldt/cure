'use strict';
const BaseController = require('../base');
const dayjs = require('dayjs');

class BottleController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service.bottle.index;
    this.botleUserService = ctx.service.bottle.bottleUser;
    this.botleReplyService = ctx.service.bottle.bottleReply;
  }

  async list() {
    const { id } = this.ctx.userinfo;
    const res = await this.botleUserService.query({ userId: id });
    this.success({ data: res });
  }

  async add() { // 登录
    const { ctx } = this;
    const { content } = ctx.request.body;
    if (!content) {
      return this.error({ data: '漂流瓶内容不能为空' });
    }


    const { id } = this.ctx.userinfo;
    const params = {
      status: 1,
      userId: id,
      content,
    };

    const res = await this.service.add(params);
    if (res.code === 200) {
      this.success({ data: res.data, msg: '抛出成功' });
    } else {
      this.error({ msg: '抛出失败' });
    }
  }

  // 抛出
  async delete() {
    const { id } = this.ctx.request.body;
    if (!id) {
      return this.error({ data: '抛出错误' });
    }

    const params = {
      id,
      status: 1,
    };

    const res = await this.service.update(params);
    if (res.code === 200) {
      this.success({ data: res.data, msg: '抛出成功' });
    } else {
      this.error({ msg: '抛出失败' });
    }
  }

  // 回复
  async reply() {
    const { bottleId, content } = this.ctx.request.body;
    if (!bottleId || !content) {
      return this.error({ msg: '请选择一个瓶子回复, 或者评论内容不能为空。' });
    }

    const { id } = this.ctx.userinfo;
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const params = {
      userId: id,
      bottleId,
      content,
      createTime: time,
    };

    const res = await this.botleReplyService.add(params);
    if (res.code === 200) {
      this.success({ data: res.data, msg: '回复成功' });
    } else {
      this.error({ msg: '回复失败' });
    }
  }
}

module.exports = BottleController;
