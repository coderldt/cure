'use strict';
const BaseController = require('../base');

class SubjectAnalysisController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service.subject.subjectAnalysis;
  }

  async list() {
    const { typeId, pageNum, pageSize } = this.ctx.request.body;
    const querytables = [
      {
        table: 'subject_analysis',
        keys: [ '*' ],
        accurateCon: {},
      },
    ];
    if (typeId) {
      querytables[0].accurateCon.typeId = typeId;
    }
    const res = await this.service.multiTableQuery(querytables, [], { pageNum, pageSize });
    if (res.code === 200) {
      this.success({ data: res.data });
    } else {
      this.error({ msg: '查询失败' });
    }
  }

  async add() { // 登录
    const { ctx } = this;
    const { typeId, score, direction, content } = ctx.request.body;
    if (!typeId || !direction || !score || !content) {
      return this.error({ data: '参数缺失' });
    }

    const res = await this.service.add({ typeId, score, direction, content });
    if (res.code === 200) {
      this.success({ data: res.data, msg: '添加成功' });
    } else {
      this.error({ msg: res.msg });
    }
  }

  async update() {
    const { typeId, score, direction, content, id } = this.ctx.request.body;
    if (!typeId || !direction || !score || !content || !id) {
      return this.error({ data: '参数缺失' });
    }

    const res = await this.service.update({ typeId, score, direction, content, id });
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

module.exports = SubjectAnalysisController;
