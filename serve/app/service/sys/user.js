'use strict';
const BaseService = require('../base');

class UserService extends BaseService {
  constructor(ctx) {
    super(ctx);
    this.table = 'sys_user';
  }

  async login(params) { // 登录
    const { app } = this;
    try {
      const result = await app.mysql.select(this.table, {
        where: params, // 查询条件
      });

      let res = null;
      if (result && result.length === 0) {
        return { code: 500, msg: '账户或密码错误' };
      }
      res = result[0];


      console.log(res);
      const token = app.jwt.sign({
        username: res.username, // 需要存储的 token 数据
        id: res.id,
      }, app.config.jwt.secret);

      // delete res.id;
      delete res.password;

      const data = {
        userInfo: {
          ...res,
        },
        token,
      };

      return { code: 200, data };
    } catch (error) {
      console.log(error);
      return { code: 500 };
    }
  }

  async add(params) {
    const res = await this.cAddData(params);
    return res;
  }

  async update({ id, avatar, username, autograph, password }) {
    const params = {
      id,
      username,
      autograph,
    };
    if (password) {
      params.password = password
    }
    if (avatar) {
      params.avatar = avatar
    }

    const res = await this.cUpdateData(params);
    return res;
  }

  async query(params) {
    return await this.cQueryData(params);
  }

}

module.exports = UserService;
