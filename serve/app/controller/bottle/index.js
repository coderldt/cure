'use strict';
const BaseController = require('../base');
const dayjs = require('dayjs');

class BottleController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service.bottle.index;
    this.botleUserService = ctx.service.bottle.bottleUser;
    this.botleReplyService = ctx.service.bottle.bottleReply;
  }

  async list() {
    const { id } = this.ctx.userinfo;
    const querytables = [
      {
        table: 'user_bottle',
        keys: [ '*' ],
        accurateCon: { userId: id },
      },
      {
        table: 'drifting_bottle',
        keys: [ 'content' ],
        leftJoinCon: [ 'user_bottle.bottleId = drifting_bottle.id' ],
        accurateCon: { status: 2 },
      },
    ];
    const res = await this.service.multiTableQuery(querytables, []);
    if (res.code === 200) {
      this.success({ data: res.data });
    } else {
      this.error({ msg: '查询失败' });
    }
  }

  // 抛出瓶子
  async add() {
    const { ctx } = this;
    const { content } = ctx.request.body;
    if (!content) {
      return this.error({ data: '漂流瓶内容不能为空' });
    }


    const { id } = this.ctx.userinfo;
    const params = {
      status: 1,
      userId: id,
      content,
    };

    const res = await this.service.add(params);
    if (res.code === 200) {
      this.success({ data: res.data, msg: '抛出成功' });
    } else {
      this.error({ msg: '抛出失败' });
    }
  }

  // 捞瓶子
  async addMyBottle() {
    const isSussess = Math.random();

    if (isSussess > 0.3) {
      return this.error({ msg: '没有捞到瓶子，别灰心哦！' });
    }

    const list = await this.service.query({ status: 1 });

    if (list.length === 0) {
      return this.error({ msg: '当前瓶子太少，您可以自己抛一个哦！' });
    }

    const index = Math.floor(Math.random() * list.length);

    const conn = await this.app.mysql.beginTransaction(); // 初始化事务
    try {
      const { id } = this.ctx.userinfo;
      const res = await this.botleUserService.cAddData({ userId: id, bottleId: list[index].id }, conn);

      const bRes = await this.service.cUpdateData({ id: list[index].id, status: 2 }, conn);

      if (res.code !== 200 || bRes.code !== 200) {
        throw new Error('出错了');
      }
      await conn.commit(); // 提交事务
      this.success({ data: list[index] });
    } catch (error) {
      await conn.rollback(); // 回滚事务！！
      this.error({ msg: '没有捞到瓶子，请等会在试！！！' });
    }
  }

  // 抛出
  async delete() {
    // 瓶子id
    const { id } = this.ctx.request.body;
    if (!id) {
      return this.error({ data: '抛出错误' });
    }

    const conn = await this.app.mysql.beginTransaction(); // 初始化事务
    try {
      const { id: userId } = this.ctx.userinfo;
      const params = {
        id,
        status: 1,
      };

      const res = await this.service.cUpdateData(params, conn);

      const uRes = await this.botleUserService.cDelData({ userId, bottleId: id }, conn);

      if (res.code !== 200 || uRes.code !== 200) {
        throw new Error('出错了');
      }
      await conn.commit(); // 提交事务
      this.success({ msg: '抛出成功' });
    } catch (error) {
      await conn.rollback(); // 回滚事务！！
      this.error({ msg: '抛出失败' });
    }
  }

  async dottleReplayList() {
    const { bottleId } = this.ctx.request.body;
    if (!bottleId) {
      return this.error({ msg: '请选择一个瓶子。' });
    }

    const res = await this.botleReplyService.query({ bottleId });
    this.success({ data: res });
  }

  // 回复
  async reply() {
    const { bottleId, content } = this.ctx.request.body;
    if (!bottleId || !content) {
      return this.error({ msg: '请选择一个瓶子回复, 或者评论内容不能为空。' });
    }

    const { id } = this.ctx.userinfo;
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const params = {
      userId: id,
      bottleId,
      content,
      createTime: time,
    };

    const res = await this.botleReplyService.add(params);
    if (res.code === 200) {
      this.success({ data: res.data, msg: '回复成功' });
    } else {
      this.error({ msg: '回复失败' });
    }
  }
}

module.exports = BottleController;
