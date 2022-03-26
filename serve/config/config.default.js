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

  // add your middleware config here
  config.middleware = [ 'tokenHandler' ];
  config.tokenHandler = {
    match(ctx) {
      // 匹配不需要验证token的路由
      const url = ctx.request.url;
      console.log(url);
      if (tokenConfig.valiPaths.some(path => url === path)) {
        return true; // 开启中间件，开启token验证
      }
      return false;
    },
  };
  config.errorConfig = {
    ...errorConfig,
  };

  // add your user config here
  const userConfig = {
    uploadAvatarDir: 'app/public/upload',
    avatarAssetsType: [ '.png', '.jpeg', '.jpg' ],
    uploadAudioDir: 'app/public/audio',
    audioAssetsType: [ '.mp3' ],
    assets: {
      publicPath: '/unionPublic/',
    },
    // myAppName: 'egg',
  };

  config.mysql = {
    client: {
      // host
      host: '127.0.0.1',
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

  config.static = {
    prefix: '/curePublic/',
  };

  config.multipart = {
    mode: 'file',
    whitelist: [
      '.jpg',
      '.jpeg',
      '.png',
      '.mp3',
    ],
    fileSize: '50mb',
  };

  config.cluster = {
    listen: {
      port: 8000,
      hostname: '127.0.0.1',
    },
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ],
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  return {
    ...config,
    ...userConfig,
  };
};
