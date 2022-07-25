'use strict';
const BaseController = require('../base');

class AudioController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service.audio.index;
    this.userAudioService = ctx.service.audio.userAudio;
  }

  async getList() {
    const { pageNum = 1, userId } = this.ctx.request.body;

    const querytables = [
      {
        table: 'sys_audio',
        keys: [ '*' ],
        vagueCon: {},
      },
    ];

    const res = await this.service.multiTableQuery(querytables, [], { pageNum, pageSize: 10 });
    if (res.code === 200) {
      const { result, pageNum, total } = res.data;

      if (userId) {
        let sqlRes = null;

        const sql = `select id, audioId from user_audio where userId = '${userId}'`;
        sqlRes = await this.service.sql(sql);

        result.forEach(i => {
          if (sqlRes.find(audioItem => audioItem.audioId === i.id)) {
            i.isStar = true;
          } else {
            i.isStar = false;
          }
        });
      } else {
        result.forEach(i => {
          i.isStar = false;
        });
      }

      this.success({ data: { data: result, pageNum, total } });
    } else {
      this.error({ msg: '查询失败' });
    }
  }

  async detail() {
    const { id } = this.ctx.request.body;
    const res = await this.service.query({ id });
    if (res.length) {
      this.success({ data: res[0] });
    } else {
      this.error({ msg: '资源找不到了' });
    }
  }

  async add() { // 登录
    const { ctx } = this;
    const { logo, name, url, author } = ctx.request.body;
    if (!logo || !name || !url) {
      return this.error({ data: '参数缺失' });
    }

    const res = await this.service.add({ logo, name, url, author });
    if (res.code === 200) {
      this.success({ data: res.data, msg: '添加成功' });
    } else {
      this.error({ msg: res.msg });
    }
  }

  async update() {
    const { logo, name, url, id, author } = this.ctx.request.body;
    if (!logo || !name || !url || !id) {
      return this.error({ data: '参数缺失' });
    }

    const res = await this.service.update({ logo, name, url, id, author });
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


  async getMyStarAudio() {
    const { id } = this.ctx.userinfo;

    const querytables = [
      {
        table: 'user_audio',
        keys: [ '*' ],
        vagueCon: {
          userId: id,
        },
      },
      {
        table: 'sys_audio',
        keys: [ 'logo', 'name', 'url', 'author' ],
        leftJoinCon: [ 'sys_audio.id = user_audio.audioId' ],
      },
    ];
    const res = await this.service.multiTableQuery(querytables, []);
    if (res.code === 200) {
      this.success({ data: res.data.result.filter(i => i.audioId) });
    } else {
      this.error({ msg: '查询失败' });
    }
  }

  async star() {
    const { audioId } = this.ctx.request.body;
    if (!audioId) {
      return this.error({ msg: '请选择一个音频' });
    }

    console.log(this.ctx.userinfo, audioId);
    const { id } = this.ctx.userinfo;
    const params = {
      userId: id,
      audioId,
    };
    const resList = await this.userAudioService.query(params);
    if (resList.length) {
      await this.userAudioService.cDelData({ id: resList[0].id });
      this.success({ msg: '取消收藏成功' });
    } else {
      const res = await this.userAudioService.add(params);
      console.log(res);
      if (res.code === 200) {
        this.success({ data: res.data, msg: '收藏成功' });
      } else {
        this.error({ msg: '出错了，请稍后再试' });
      }
    }
  }
}

module.exports = AudioController;
