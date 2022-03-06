'use strict';
const BaseController = require('../base');

class DictController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service.sys.dict;
    this.childrenService = ctx.service.sys.dictChildren;
  }

  async list() {
    const res = await this.service.query({});
    this.success({ data: res });
  }

  async add() { // 登录
    const { ctx } = this;
    const { label, value } = ctx.request.body;
    if (!label || !value) {
      return this.error({ data: '标签和值不能为空' });
    }

    const qList = await this.service.query({ value });
    if (qList.length !== 0) {
      return this.error({ msg: '值已经存在' });
    }

    const res = await this.service.add({ label, value });
    if (res.code === 200) {
      this.success({ data: res.data, msg: '添加成功' });
    } else {
      this.error({ msg: res.msg });
    }
  }

  async update() {
    const { label, value, id } = this.ctx.request.body;
    if (!label || !value || !id) {
      return this.error({ data: '标签和值不能为空' });
    }

    // const qList = await this.service.query({ value });
    // if (qList.length !== 0) {
    //   return this.error({ msg: '该值已经存在' });
    // }

    const res = await this.service.update({ label, value, id });
    if (res.code === 200) {
      this.success({ data: res.data, msg: '修改成功' });
    } else {
      this.error({ msg: res.msg });
    }
  }

  async delete() {
    const { id } = this.ctx.request.body;
    if (!id) {
      return this.error({ data: '标签和值不能为空' });
    }

    await this.service.cDelData({ id });
    await this.childrenService.cDelData({ parentId: id });
    this.success({ msg: '删除成功' });
    // if (res.code === 200 && cRes.code === 200) {
    //   this.success({ data: res.data, msg: '删除成功' });
    // } else {
    //   this.error({ msg: res.msg });
    // }
  }
}

module.exports = DictController;
