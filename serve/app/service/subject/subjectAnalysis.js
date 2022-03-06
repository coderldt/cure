'use strict';
const BaseService = require('../base');

class SubjectAnalysisService extends BaseService {
  constructor(ctx) {
    super(ctx);
    this.table = 'subject_analysis';
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

module.exports = SubjectAnalysisService;
