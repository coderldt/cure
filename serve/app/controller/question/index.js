'use strict';
const BaseController = require('../base');

class QuestionController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service.question.index;
  }

  async list() {
    const { title, pageNum = 1 } = this.ctx.request.body;
    const querytables = [
      {
        table: 'questions',
        keys: [ '*' ],
        vagueCon: {},
      },
    ];
    if (title) {
      querytables[0].vagueCon.title = title;
    }
    const res = await this.service.multiTableQuery(querytables, [], { pageNum, pageSize: 5 });
    if (res.code === 200) {
      this.success({ data: res.data });
    } else {
      this.error({ msg: '查询失' });
    }
  }

  async add() { // 登录
    const { title, label = [], desc } = this.ctx.request.body;
    if (!title || !desc) {
      return this.error({ msg: '标题或者描述为空' });
    }

    const { id } = this.ctx.userinfo;
    const params = {
      title,
      labels: label.join(','),
      userId: id,
      desc,
    };

    const res = await this.service.add(params);
    if (res.code === 200) {
      this.success({ data: res.data, msg: '添加成功' });
    } else {
      this.error({ msg: res.msg });
    }
  }

  async update() {
    const { title, label = [], desc, id } = this.ctx.request.body;
    if (!title || !desc || !id) {
      return this.error({ data: '标题或者描述为空' });
    }

    const params = {
      id,
      title,
      labels: label.join(','),
      desc,
    };

    const res = await this.service.update(params);
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

module.exports = QuestionController;
