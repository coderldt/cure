'use strict';
const BaseController = require('../base');

class ArticleController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service.sys.article;
  }

  async list() {
    const { title, pageNum, pageSize } = this.ctx.request.body;
    const querytables = [
      {
        table: 'article',
        keys: [ '*' ],
        vagueCon: {},
      },
    ];
    if (title) {
      querytables[0].vagueCon.title = title;
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
    const { title, content } = ctx.request.body;
    if (!title || !content) {
      return this.error({ data: '标题和内容不能为空' });
    }

    const res = await this.service.add({ title, content });
    if (res.code === 200) {
      this.success({ data: res.data, msg: '添加成功' });
    } else {
      this.error({ msg: res.msg });
    }
  }

  async update() {
    const { title, content, id } = this.ctx.request.body;
    if (!title || !content || !id) {
      return this.error({ data: '标题和内容不能为空' });
    }

    const res = await this.service.update({ title, content, id });
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

module.exports = ArticleController;
