'use strict';
const BaseService = require('../base');

class StatService extends BaseService {
  constructor(ctx) {
    super(ctx);
    this.table = 'user_similar';
  }

  async add(params) {
    const res = await this.cAddData(params);
    return res;
  }

  async update(params) {
    const res = await this.cUpdateData(params);
    return res;
  }

  async query(params) {
    return await this.cQueryData(params);
  }
}

module.exports = StatService;
