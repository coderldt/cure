
'use strict';
// eslint-disable-next-line no-unused-vars
module.exports = options => {
  return async function(ctx, next) {
    const token = ctx.request.header.token;
    // token = token.split("Bearer ")[1];

    let decode = '';
    if (token) {
      try {
        // 解码token
        decode = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);// 验证token
        // 获取用户信息
        ctx.userinfo = decode;
      } catch (error) {
        console.log(error);
        ctx.body = {
          code: 401,
          msg: '登录失效，请重新登录',
        };
        return;
      }
      await next();
    } else {
      ctx.body = {
        code: 401,
        msg: '无权限访问，请先登录',
      };
      return;
    }
  };
};
