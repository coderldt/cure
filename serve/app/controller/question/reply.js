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

    const res = await this.service.query({ questionId });
    this.success({ data: res });
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
    ];
    const res = await this.service.multiTableQuery(querytables, [], null);
    if (res.code === 200) {
      this.success({ data: res.data });
    } else {
      this.error({ msg: '查询失败' });
    }
  }
}

module.exports = ReplyController;
