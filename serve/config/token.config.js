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
    '/cureApi/question/delete',
    '/cureApi/question/updateQuestion',

    '/cureApi/subject/randomTest',
    '/cureApi/subject/testResult',
    '/cureApi/subject/testHistory',

    '/cureApi/testSubject/delHistory',

    '/cureApi/user/myArticle',
    '/cureApi/user/myQuestions',
    '/cureApi/article/updateArticle',

    '/cureApi/bottle/list',
    '/cureApi/bottle/add',
    '/cureApi/bottle/reply',
    '/cureApi/bottle/delete',
    '/cureApi/bottle/addMyBottle',

    '/cureApi/audio/star',
    '/cureApi/audio/getMyStarAudio',
  ],
};
