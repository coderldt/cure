'use strict';
const BaseController = require('../base');
const dayjs = require('dayjs');

class ReplyController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service.question.reply;
    this.replyUserservice = ctx.service.question.replyUser;
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
}

module.exports = ReplyController;
