'use strict';
const BaseController = require('../base');

class TestSubjectController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service.subject.testSubject;
    this.analysisService = ctx.service.subject.subjectAnalysis;
    this.useSubjectService = ctx.service.sys.useSubject;
  }

  async list() {
    const { title, typeId, pageNum, pageSize } = this.ctx.request.body;
    const querytables = [
      {
        table: 'test_subject',
        keys: [ '*' ],
        vagueCon: {},
      },
    ];
    if (title) {
      querytables[0].vagueCon.title = title;
    }
    if (typeId) {
      querytables[0].vagueCon.typeId = typeId;
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
    const { title, typeId } = ctx.request.body;
    if (!title || !typeId) {
      return this.error({ data: '标题和类型不能为空' });
    }

    const res = await this.service.add({ title, typeId });
    if (res.code === 200) {
      this.success({ data: res.data, msg: '添加成功' });
    } else {
      this.error({ msg: res.msg });
    }
  }

  async update() {
    const { title, typeId, id } = this.ctx.request.body;
    if (!title || !typeId || !id) {
      return this.error({ data: '标题和内容不能为空' });
    }

    const res = await this.service.update({ title, typeId, id });
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

  async randomTest() {
    const { typeId } = this.ctx.request.body;
    if (!typeId) {
      return this.error({ msg: '请选择一种类型' });
    }

    const subject = await this.service.query({ typeId });
    let subList = [];
    if (subject.length <= 10) {
      subList = subject.map(i => [ i ]);
    } else {
      subList = this.randomList(subject, 10);
    }
    console.log(subList);
    const ids = subList.map(i => ` '${i[0].id}' `);
    const answerList = await this.service.cMysqlQuery({ table: 'subject_answer', keys: [ '*' ], where: [ `subjectId in (${ids.join(',')})` ] });

    this.success({ data: { answerList, subList } });
  }

  async testResult() {
    const { typeId, score } = this.ctx.request.body;
    if (!typeId || !score) {
      return this.error({ msg: '分数不能为空' });
    }

    const resultAnaly = await this.analysisService.query({ typeId });
    if (!resultAnaly.length) {
      return this.error({ msg: '请联系管理员尽快添加解析结果' });
    }

    let min = null;
    const middle = [];
    let max = null;
    resultAnaly.forEach(i => {
      if (i.direction === 1) {
        min = i;
      } else if (i.direction === 3) {
        max = i;
      } else {
        middle.push(i);
      }
    });
    middle.sort((a, b) => a.score > b.score);

    let result = '';
    if (score <= min.score) {
      result = min.content;
    } else if (score >= max.score) {
      result = max.content;
    } else {
      for (const item of middle) {
        if (score <= item.score) {
          result = item.content;
          break;
        }
      }

      if (!result) {
        result = middle[middle.length - 1].content;
      }
    }

    const { id } = this.ctx.userinfo;
    const subject = await this.useSubjectService.add({ typeId, score, content: result, userId: id });
    if (subject.code === 200) {
      return this.success({ data: { result, score } });
    }
    return this.error({ msg: '程序出错了' });
  }

  async testHistory() {
    const { id } = this.ctx.userinfo;

    const querytables = [
      {
        table: 'user_subject',
        keys: [ 'id', 'content', 'score' ],
        accurateCon: { userId: id },
      },
      {
        table: 'sys_dict_chindren',
        keys: [ 'label' ],
        leftJoinCon: [ 'user_subject.typeId = sys_dict_chindren.value' ],
      },
    ];
    const res = await this.service.multiTableQuery(querytables, []);
    if (res.code === 200) {
      this.success({ data: res.data.result });
    } else {
      this.error({ msg: '查询失败' });
    }
  }

  async delHistory() {
    const { id } = this.ctx.request.body;
    if (!id) {
      return this.error({ data: '参数错误' });
    }
    const res = await this.useSubjectService.cDelData({ id });
    if (res.code === 200) {
      this.success({ msg: '删除成功' });
    } else {
      this.error({ msg: '删除失败' });
    }
  }

  randomInteger(min, max) {
    const random = min + Math.random() * (max - min);
    return Math.floor(random);
  }

  randomList(list, number) {
    const arr = list.map(i => i);
    const res = [];
    for (let i = 1; i <= number; i++) {
      const index = this.randomInteger(0, arr.length);
      res.push(arr.splice(index, 1));
    }
    return res;
  }
}

module.exports = TestSubjectController;
