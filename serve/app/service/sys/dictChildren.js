'use strict';
const BaseService = require('../base');

class DictChildrenService extends BaseService {
  constructor(ctx) {
    super(ctx);
    this.table = 'sys_dict_chindren';
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

module.exports = DictChildrenService;
