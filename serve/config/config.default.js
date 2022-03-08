/* eslint valid-jsdoc: "off" */

'use strict';

const tokenConfig = require('./token.config');
const errorConfig = require('./error.config');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1644389498840_8463';
  // config.secret = 'ab529c58d14638dfd5934d51c58bd1b6';
  // config.appid = 'wx9211e74611efe214';

  // add your middleware config here
  config.middleware = [ 'tokenHandler' ];
  config.tokenHandler = {
    match(ctx) {
      // 匹配不需要验证token的路由
      const url = ctx.request.url;
      if (tokenConfig.ignoreValiPaths.some(path => url === path)) {
        return false;
      }
      return true; // 开启中间件，开启token验证
    },
  };
  config.errorConfig = {
    ...errorConfig,
  };

  // add your user config here
  const userConfig = {
    uploadAvatarDir: 'app/public/upload',
    assets: {
      publicPath: '/unionPublic/',
    },
    // myAppName: 'egg',
  };

  config.mysql = {
    client: {
      // host
      host: '180.76.173.85',
      // port
      port: '26895',
      // username
      user: 'root',
      // password
      password: 'coderltmysql228',
      // database
      database: 'cure',
    },
    app: true,
    agent: false,
  };

  config.jwt = {
    secret: '123456',
    sign: {
      expiresIn: 360000,
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.static = {
    prefix: '/unionPublic/',
  };

  config.multipart = {
    mode: 'file',
  };

  return {
    ...config,
    ...userConfig,
  };
};
