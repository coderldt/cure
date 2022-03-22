'use strict';
const BaseController = require('../base');

class ArticleController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service.sys.article;
    this.userArticleservice = ctx.service.sys.articleUser;
  }

  async list() {
    const { title, pageNum, pageSize, userId } = this.ctx.request.body;
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

    let result = null;
    if (userId) {
      const userArticle = await this.userArticleservice.query({ userId });
      result = res.data.result.map(item => {
        if (userArticle.find(i => i.articleId === item.id)) {
          item.star = true;
        } else {
          item.star = false;
        }
        return item;
      });
    } else {
      result = res.data.result.map(i => {
        i.star = false;
        return i;
      });
    }

    if (res.code === 200) {
      this.success({ data: { ...res.data, result } });
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

  // APP
  async updateArticle() {
    const { articleId } = this.ctx.request.body;
    if (!articleId) {
      return this.error({ msg: '请选择一个文章' });
    }

    const { id } = this.ctx.userinfo;
    const params = {
      userId: id,
      articleId,
    };

    const resList = await this.userArticleservice.query(params);
    if (resList.length) {
      await this.userArticleservice.cDelData({ id: resList[0].id });
      this.success({ msg: '取消收藏成功' });
    } else {
      const res = await this.userArticleservice.add(params);
      if (res.code === 200) {
        this.success({ data: res.data, msg: '收藏成功' });
      } else {
        this.error({ msg: '出错了，请稍后再试' });
      }
    }
  }

  async myArticle() {
    const { id } = this.ctx.userinfo;

    const querytables = [
      {
        table: 'user_article',
        keys: [ '*' ],
        vagueCon: {},
        accurateCon: { userId: id },
      },
      {
        table: 'article',
        keys: [ 'title', 'id as articleId', 'content', 'createTime', 'image' ],
        leftJoinCon: [ 'article.id = user_article.articleId' ],
      },
    ];
    const res = await this.service.multiTableQuery(querytables, [], null);
    if (res.code === 200) {
      this.success({ data: res.data });
    } else {
      this.error({ msg: '查询失败' });
    }
  }

  async detail() {
    const { articleId, userId } = this.ctx.request.body;
    if (!articleId) {
      return this.error({ data: '请选择一个文章' });
    }

    const res = await this.service.query({ id: articleId });
    if (res.length) {
      if (userId) {
        const userArticle = await this.userArticleservice.query({ articleId, userId });
        res[0].star = !!userArticle.length;
      } else {
        res[0].star = false;
      }
      this.success({ data: res[0] });
    } else {
      this.error({ msg: '文章找不到了' });
    }
  }
}

module.exports = ArticleController;
