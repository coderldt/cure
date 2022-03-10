
'use strict';
const BaseService = require('../base');

class UserSubjectService extends BaseService {
  constructor(ctx) {
    super(ctx);
    this.table = 'user_subject';
  }

  async add(params) {
    const res = await this.cAddData(params);
    return res;
  }

  async update({ openid, avatar, user_name }) {
    const params = {
      id: this.md5(openid),
      user_avatar: avatar,
      user_name,
    };

    const res = await this.cUpdateData(params);
    return res;
  }

  async query(params) {
    return await this.cQueryData(params);
  }

}

module.exports = UserSubjectService;
