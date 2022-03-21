'use strict';
const BaseController = require('../base');

class SubjectAnswerController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service.subject.subjectAnswer;
    this.dictChildrenService = ctx.service.sys.dictChildren;
  }

  async typeLists() {
    const { typeId } = this.ctx.request.body;

    const params = {
      parentId: '5',
    };

    if (typeId) {
      params.value = typeId;
    }
    const res = await this.dictChildrenService.query(params);
    this.success({ data: res });
  }

  async list() {
    const { subjectId } = this.ctx.request.body;
    const res = await this.service.query({ subjectId });
    this.success({ data: res });
  }

  async add() { // 登录
    const { ctx } = this;
    const { subjectId, desc, score } = ctx.request.body;
    if (!subjectId || !desc || !score) {
      return this.error({ data: '描述和分值不能为空' });
    }

    const res = await this.service.add({ subjectId, desc, score });
    if (res.code === 200) {
      this.success({ data: res.data, msg: '添加成功' });
    } else {
      this.error({ msg: res.msg });
    }
  }

  async update() {
    const { subjectId, desc, score, id } = this.ctx.request.body;
    if (!subjectId || !desc || !score || !id) {
      return this.error({ data: '描述和分值不能为空' });
    }

    const res = await this.service.update({ subjectId, desc, score, id });
    if (res.code === 200) {
      this.success({ data: res.data, msg: '修改成功' });
    } else {
      this.error({ msg: res.msg });
    }
  }

  async delete() {
    const { id } = this.ctx.request.body;
    if (!id) {
      return this.error({ data: '参数错误' });
    }

    await this.service.cDelData({ id });
    this.success({ msg: '删除成功' });
  }
}

module.exports = SubjectAnswerController;
