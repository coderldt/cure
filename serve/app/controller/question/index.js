'use strict';
const BaseController = require('../base');

class QuestionController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service.question.index;
    this.questionUserservice = ctx.service.question.questionUser;
  }

  async list() {
    const { title, pageNum = 1 } = this.ctx.request.body;
    const { id } = this.ctx.userinfo;

    const where = [ `questions.userId = '${id}'` ];
    if (title) {
      where.push(`questions.title like '%${title}%'`);
    }

    const sql = `select
    questions.*, count(user_similar.questionId) as count, count(question_reply.questionId) as commentCount
    from questions
    left join user_similar
    on questions.id = user_similar.questionId
    left join question_reply
    on questions.id = question_reply.questionId
    where ${where.join(' and ')}
    group by questions.id
    order by count desc
    limit 5 offset ${(pageNum - 1) * 5};`;
    const res = await this.service.sql(sql);
    if (res.length) {
      this.success({ data: res });
    } else {
      this.error({ msg: '查询失败' });
    }
  }

  async hotList() {
    const { title, pageNum = 1 } = this.ctx.request.body;
    const where = [];
    if (title) {
      where.push(`questions.title like '%${title}%'`);
    }

    const sql = `select
    questions.*, count(user_similar.questionId) as count, count(question_reply.questionId) as commentCount
    from questions
    left join user_similar
    on questions.id = user_similar.questionId
    left join question_reply
    on questions.id = question_reply.questionId
    ${where.length ? `where ${where.join(' and ')}` : ''}
    group by questions.id
    order by count desc
    limit 5 offset ${(pageNum - 1) * 5};`;
    const res = await this.service.sql(sql);
    if (res.length) {
      this.success({ data: res });
    } else {
      this.error({ msg: '查询失败' });
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

  // APP
  async updateQuestion() {
    const { questionId } = this.ctx.request.body;
    if (!questionId) {
      return this.error({ msg: '请选择一个提问' });
    }

    const { id } = this.ctx.userinfo;
    const params = {
      userId: id,
      questionId,
    };

    const resList = await this.questionUserservice.query(params);
    if (resList.length) {
      await this.questionUserservice.cDelData({ id: resList[0].id });
      this.success({ msg: '取消成功' });
    } else {
      const res = await this.questionUserservice.add(params);
      if (res.code === 200) {
        this.success({ data: res.data, msg: '点赞成功' });
      } else {
        this.error({ msg: '出错了，请稍后再试' });
      }
    }
  }

  // 我发布的
  async myQuestions() {
    const { id } = this.ctx.userinfo;

    const res = await this.service.query({ userId: id });
    this.success({ data: res });
  }
}

module.exports = QuestionController;
