'use strict';
const BaseService = require('../base');

class ArticleService extends BaseService {
  constructor(ctx) {
    super(ctx);
    this.table = 'article';
  }

  async add(params) {
    const res = await this.cAddData(params);
    return res;
  }

  async update(params) {
    const res = await this.cUpdateData(params);
    console.log(res, 'res');
    return res;
  }

  async query(params) {
    return await this.cQueryData(params);
  }

}

module.exports = ArticleService;
