'use strict';
const BaseController = require('../base');
const dayjs = require('dayjs');

class ReplyController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service.question.reply;
    this.replyUserservice = ctx.service.question.replyUser;
  }

  // 回复的所有评论
  async list() {
    const { questionId } = this.ctx.request.body;
    if (!questionId) {
      return this.error({ msg: '找不到该问题id' });
    }
    const querytables = [
      {
        table: 'question_reply',
        keys: [ '*' ],
        vagueCon: { questionId },
      },
      {
        table: 'sys_user',
        keys: [ 'username', 'avatar' ],
        leftJoinCon: [ 'question_reply.rUserId = sys_user.id' ],
      },
      {
        table: 'user_reply',
        keys: [ ],
        totalKeys: [ 'count(user_reply.id) as countReply' ],
        leftJoinCon: [ 'user_reply.replyId = question_reply.id' ],
      },
    ];

    const res = await this.service.multiTableQuery(querytables, [], null, 'question_reply.id');
    if (res.code === 200) {
      const { id } = this.ctx.userinfo;
      const resList = await this.replyUserservice.query({ userId: id });
      res.data.result.forEach(reply => {
        if (resList.find(i => i.replyId === reply.id)) {
          reply.checked = true;
        } else {
          reply.checked = false;
        }

        reply.isDel = (reply.rUserId === id);
      });

      const resTree = this.arrayToTree(this.sortTime(res.data.result));
      this.success({ data: resTree });
    } else {
      this.error({ msg: '查询失败' });
    }
  }

  async getMyReply() {
    const { id } = this.ctx.userinfo;
    const resList = await this.replyUserservice.query({ userId: id });
    this.success({ data: resList });
  }

  async add() {
    const { questionId, content, replyId } = this.ctx.request.body;
    if (!questionId || !content) {
      return this.error({ msg: '回复内容为空，或者找不到该文章' });
    }

    const { id } = this.ctx.userinfo;
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const params = {
      questionId,
      rUserId: id,
      content,
      createTime: time,
    };

    replyId && (params.replyId = replyId);

    const res = await this.service.add(params);
    if (res.code === 200) {
      this.success({ data: res.data, msg: '评论成功' });
    } else {
      this.error({ msg: '评论失败' });
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
  async updateReply() {
    const { replyId } = this.ctx.request.body;
    if (!replyId) {
      return this.error({ msg: '请选择一个回复评论' });
    }

    const { id } = this.ctx.userinfo;
    const params = {
      userId: id,
      replyId,
    };

    const resList = await this.replyUserservice.query(params);
    if (resList.length) {
      await this.replyUserservice.cDelData({ id: resList[0].id });
      this.success({ msg: '取消成功' });
    } else {
      const res = await this.replyUserservice.add(params);
      if (res.code === 200) {
        this.success({ data: res.data, msg: '点赞成功' });
      } else {
        this.error({ msg: '出错了，请稍后再试' });
      }
    }
  }

  // 我的所有评论
  async myReply() {
    const { id } = this.ctx.userinfo;

    const querytables = [
      {
        table: 'question_reply',
        keys: [ '*' ],
        vagueCon: {},
        accurateCon: { rUserId: id },
      },
      {
        table: 'questions',
        keys: [ 'title', 'labels', 'desc' ],
        leftJoinCon: [ 'questions.id = question_reply.questionId' ],
      },
      {
        table: 'sys_user',
        keys: [ 'username', 'avatar' ],
        leftJoinCon: [ 'questions.userId = sys_user.id' ],
      },
      {
        table: 'user_reply',
        keys: [ ],
        totalKeys: [ 'count(user_reply.id) as countReply' ],
        leftJoinCon: [ 'user_reply.replyId = question_reply.id' ],
      },
    ];
    const res = await this.service.multiTableQuery(querytables, [], null, 'question_reply.id');
    if (res.code === 200) {
      this.success({ data: res.data });
    } else {
      this.error({ msg: '查询失败' });
    }
  }

  sortTime(list) {
    return list.sort((a, b) => {
      return dayjs(a.createTime).isAfter(b.createTime) ? -1 : 1;
    });
  }

  arrayToTree(data) {
    const result = [];
    if (!Array.isArray(data)) {
      return result;
    }

    const map = {};
    data.forEach(item => {
      map[item.id] = item;
    });
    data.forEach(item => {
      const parent = map[item.replyId];
      if (parent) {
        (parent.children || (parent.children = [])).push(item);
      } else {
        result.push(item);
      }
    });
    return result;
  }
}

module.exports = ReplyController;
