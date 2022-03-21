'use strict';
const BaseController = require('../base');

class QuestionController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service.question.index;
    this.questionUserservice = ctx.service.question.questionUser;
  }

  async list() {
    const { title, pageNum = 1, userId } = this.ctx.request.body;

    const querytables = [
      {
        table: 'questions',
        keys: [ '*' ],
        vagueCon: {},
      },
      {
        table: 'sys_user',
        keys: [ 'username', 'avatar' ],
        leftJoinCon: [ 'questions.userId = sys_user.id' ],
      },
      {
        table: 'question_reply',
        keys: [ ],
        totalKeys: [ 'count(question_reply.questionId) as commentCount' ],
        leftJoinCon: [ 'questions.id = question_reply.questionId' ],
      },
    ];

    if (title) {
      querytables[0].vagueCon.title = title;
    }

    const res = await this.service.multiTableQuery(querytables, [], { pageNum, pageSize: 5 }, 'questions.id', 'commentCount desc');
    if (res.code === 200) {
      const { result, pageNum, total } = res.data;

      let sqlRes = null;
      const map = {};

      if (result.length) {
        const sql = `select id, questionId, userId from user_similar where questionId in (${result.map(i => `'${i.id}'`).join(',')})`;
        sqlRes = await this.service.sql(sql);
        sqlRes.forEach(i => {
          if (map[i.questionId]) {
            map[i.questionId] += 1;
          } else {
            map[i.questionId] = 1;
          }
        });
      }

      if (userId) {
        result.forEach(i => {
          i.count = (map[i.id] || 0);
          i.reply = [];
          if (sqlRes.find(item => item.userId === Number(userId) && item.questionId === i.id)) {
            i.isStar = true;
          } else {
            i.isStar = false;
          }
        });
      } else {
        result.forEach(i => {
          i.count = (map[i.id] || 0);
          i.isStar = false;
          i.reply = [];
        });
      }

      this.success({ data: { data: result, pageNum, total } });
    } else {
      this.error({ msg: '查询失败' });
    }
  }

  // 查询评论数不准，因为表查询了两次
  async hotList() {
    const { title, pageNum = 1, userId } = this.ctx.request.body;

    const querytables = [
      {
        table: 'questions',
        keys: [ '*' ],
        vagueCon: {},
      },
      {
        table: 'sys_user',
        keys: [ 'username', 'avatar' ],
        leftJoinCon: [ 'questions.userId = sys_user.id' ],
      },
      {
        table: 'user_similar',
        keys: [ ],
        totalKeys: [ 'count(user_similar.questionId) as count' ],
        leftJoinCon: [ 'questions.id = user_similar.questionId' ],
      },
    ];

    if (title) {
      querytables[0].vagueCon.title = title;
    }

    const res = await this.service.multiTableQuery(querytables, [], { pageNum, pageSize: 5 }, 'questions.id', 'count desc');
    if (res.code === 200) {
      const { result, pageNum, total } = res.data;

      let sqlRes = null;
      let replySqlRes = null;
      const map = {};

      if (result.length) {
        const sql = `select id, questionId from question_reply where questionId in (${result.map(i => `'${i.id}'`).join(',')})`;
        const replySql = `select id, questionId from question_reply where replyId in (${result.map(i => `'${i.id}'`).join(',')})`;
        sqlRes = await this.service.sql(sql);
        replySqlRes = await this.service.sql(replySql);

        sqlRes.forEach(i => {
          if (map[i.questionId]) {
            map[i.questionId] += 1;
          } else {
            map[i.questionId] = 1;
          }
        });
        replySqlRes.forEach(i => {
          if (map[i.questionId]) {
            map[i.questionId] += 1;
          } else {
            map[i.questionId] = 1;
          }
        });
      }

      const sql = `select id, questionId, userId from user_similar where questionId in (${result.map(i => `'${i.id}'`).join(',')})`;
      const sqlSimilarRes = await this.service.sql(sql);
      if (userId) {
        result.forEach(i => {
          i.commentCount = (map[i.id] || 0);
          i.reply = [];
          if (sqlSimilarRes.find(item => item.userId === Number(userId) && item.questionId === i.id)) {
            i.isStar = true;
          } else {
            i.isStar = false;
          }
        });
      } else {
        result.forEach(i => {
          i.commentCount = (map[i.id] || 0);
          i.isStar = false;
          i.reply = [];
        });
      }

      this.success({ data: { data: result, pageNum, total } });
    } else {
      this.error({ msg: '查询失败' });
    }
  }

  async add() {
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
