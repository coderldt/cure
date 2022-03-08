'use strict';
const BaseService = require('../base');

class ArticleUserService extends BaseService {
  constructor(ctx) {
    super(ctx);
    this.table = 'user_article';
  }

  async add(params) {
    const res = await this.cAddData(params);
    return res;
  }

  async query(params) {
    return await this.cQueryData(params);
  }
}

module.exports = ArticleUserService;
