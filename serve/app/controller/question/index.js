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
        const sql = `select id, questionId from user_similar where questionId in (${result.map(i => `'${i.id}'`).join(',')})`;
        sqlRes = await this.service.sql(sql);

        sqlRes.forEach(i => {
          if (map[i.questionId]) {
            map[i.questionId] += 1;
          } else {
            map[i.questionId] = 1;
          }
        });
      }
      result.forEach(i => {
        i.count = (map[i.id] || 0);
      });

      this.success({ data: { data: result, pageNum, total } });
      // this.success({ data: res.data });
    } else {
      this.error({ msg: '查询失败' });
    }

    // const where = [ `questions.userId = '${id}'` ];
    // const where = [];
    // if (title) {
    //   where.push(`questions.title like '%${title}%'`);
    // }

    // const sql = `select
    //   questions.*,
    //   count(user_similar.questionId) as count,
    //   count(question_reply.questionId) as commentCount,
    //   sys_user.username,
    //   sys_user.avatar
    // from questions
    // left join user_similar
    // on questions.id = user_similar.questionId
    // left join sys_user
    // on questions.userId = sys_user.id
    // left join question_reply
    // on questions.id = question_reply.questionId
    // ${where.length ? `where ${where.join(' and ')}` : ''}
    // group by questions.id
    // order by commentCount desc
    // limit 5 offset ${(pageNum - 1) * 5};`;

    // const total = `select
    // count(1)
    // from questions
    // ${where.length ? `where ${where.join(' and ')}` : ''}`;
    // const res = await this.service.sql(sql);
    // const totelRes = await this.service.sql(total);
    // if (res.length) {
    //   this.success({ data: {
    //     data: res,
    //     pageNum,
    //     total: JSON.parse(JSON.stringify(totelRes))[0]['count(1)'],
    //   } });
    // } else {
    //   this.error({ msg: '查询失败' });
    // }
  }

  async hotList() {
    const { title, pageNum = 1 } = this.ctx.request.body;

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
      // {
      //   table: 'question_reply',
      //   keys: [ ],
      //   totalKeys: [ 'count(question_reply.questionId) as commentCount' ],
      //   leftJoinCon: [ 'questions.id = question_reply.questionId' ],
      // },
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
      result.forEach(i => {
        i.commentCount = (map[i.id] || 0);
      });

      this.success({ data: { data: result, pageNum, total } });
      // this.success({ data: res.data });
    } else {
      this.error({ msg: '查询失败' });
    }

    // const where = [];
    // if (title) {
    //   where.push(`questions.title like '%${title}%'`);
    // }

    // const sql = `select
    // questions.*,
    //   count(user_similar.questionId) as count,
    //   count(question_reply.questionId) as commentCount,
    //   sys_user.username,
    //   sys_user.avatar
    // from questions
    // left join user_similar
    // on questions.id = user_similar.questionId
    // left join sys_user
    // on questions.userId = sys_user.id
    // left join question_reply
    // on questions.id = question_reply.questionId
    // ${where.length ? `where ${where.join(' and ')}` : ''}
    // group by questions.id
    // order by count desc
    // limit 5 offset ${(pageNum - 1) * 5};`;

    // const total = `select
    // count(1)
    // from questions
    // ${where.length ? `where ${where.join(' and ')}` : ''}`;
    // const res = await this.service.sql(sql);
    // const totalRes = await this.service.sql(total);
    // if (res.length) {
    //   this.success({ data: {
    //     data: res,
    //     pageNum,
    //     total: JSON.parse(JSON.stringify(totalRes))[0]['count(1)'],
    //   } });
    // } else {
    //   this.error({ msg: '查询失败' });
    // }
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
