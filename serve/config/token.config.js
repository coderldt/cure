'use strict';
module.exports = {
  // 忽略token验证路由
  valiPaths: [
    '/cureApi/star/update',
    '/cureApi/star/list',

    '/cureApi/reply/list',
    '/cureApi/reply/add',
    '/cureApi/user/myReply',
    '/cureApi/reply/updateReply',
    '/cureApi/user/getReplyStar',
    '/cureApi/reply/delete',

    '/cureApi/question/add',
    '/cureApi/question/updateQuestion',
  ],
};
