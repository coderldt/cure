'use strict';
const BaseController = require('../base');

class DictChildrenController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service.sys.dictChildren;
  }

  async list() {
    const { id } = this.ctx.request.body;
    const res = await this.service.query({ parentId: id });
    this.success({ data: res });
  }

  async add() { // 登录
    const { ctx } = this;
    const { label, value, id } = ctx.request.body;
    if (!label || !value || !id) {
      return this.error({ data: '标签和值不能为空' });
    }

    const qList = await this.service.query({ value });
    if (qList.length !== 0) {
      return this.error({ msg: '值已经存在' });
    }

    const res = await this.service.add({ label, value, parentId: id });
    if (res.code === 200) {
      this.success({ data: res.data, msg: '添加成功' });
    } else {
      this.error({ msg: res.msg });
    }
  }

  async delete() {
    const { value } = this.ctx.request.body;
    if (!value) {
      return this.error({ data: '值不能为空' });
    }

    await this.service.cDelData({ value });
    this.success({ msg: '删除成功' });
  }
}

module.exports = DictChildrenController;
