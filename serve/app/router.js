'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.prefix('/cureApi');
  router.post('/login', controller.sys.user.login);
  router.post('/update', controller.sys.user.update);
  router.post('/register', controller.sys.user.register);

  router.post('/dict/list', controller.sys.dict.list);
  router.post('/dict/add', controller.sys.dict.add);
  router.post('/dict/update', controller.sys.dict.update);
  router.post('/dict/delete', controller.sys.dict.delete);

  router.post('/dictChildren/list', controller.sys.dictChildren.list);
  router.post('/dictChildren/add', controller.sys.dictChildren.add);
  router.post('/dictChildren/delete', controller.sys.dictChildren.delete);

  router.post('/article/list', controller.sys.article.list);
  router.post('/article/add', controller.sys.article.add);
  router.post('/article/update', controller.sys.article.update);
  router.post('/article/delete', controller.sys.article.delete);
  router.post('/article/detail', controller.sys.article.detail);

  router.post('/testSubject/list', controller.subject.testSubject.list);
  router.post('/testSubject/add', controller.subject.testSubject.add);
  router.post('/testSubject/update', controller.subject.testSubject.update);
  router.post('/testSubject/delete', controller.subject.testSubject.delete);
  router.post('/testSubject/delHistory', controller.subject.testSubject.delHistory);

  router.post('/subjectAnswer/list', controller.subject.subjectAnswer.list);
  router.post('/subjectAnswer/add', controller.subject.subjectAnswer.add);
  router.post('/subjectAnswer/update', controller.subject.subjectAnswer.update);
  router.post('/subjectAnswer/delete', controller.subject.subjectAnswer.delete);

  router.post('/subjectAnalysis/list', controller.subject.subjectAnalysis.list);
  router.post('/subjectAnalysis/add', controller.subject.subjectAnalysis.add);
  router.post('/subjectAnalysis/update', controller.subject.subjectAnalysis.update);
  router.post('/subjectAnalysis/delete', controller.subject.subjectAnalysis.delete);

  router.post('/upload', controller.tools.upload.upload);

  // APP
  router.post('/question/list', controller.question.index.list);
  router.post('/question/hotList', controller.question.index.hotList); // 热门
  router.post('/question/add', controller.question.index.add);
  router.post('/question/update', controller.question.index.update);
  router.post('/question/delete', controller.question.index.delete);

  // 同情
  router.post('/star/update', controller.question.star.update);
  router.post('/star/list', controller.question.star.list);
  // 收藏/取消文章
  router.post('/article/updateArticle', controller.sys.article.updateArticle);
  // 点赞、取消评论回复
  router.post('/reply/updateReply', controller.question.reply.updateReply);
  // 点赞、取消提问
  router.post('/question/updateQuestion', controller.question.index.updateQuestion);

  // 回复评论
  router.post('/reply/list', controller.question.reply.list); // 某个问题的所有评论
  router.post('/reply/add', controller.question.reply.add);
  router.post('/reply/delete', controller.question.reply.delete);

  // 漂流瓶
  router.post('/bottle/list', controller.bottle.index.list);
  router.post('/bottle/add', controller.bottle.index.add);
  router.post('/bottle/delete', controller.bottle.index.delete);
  router.post('/bottle/reply', controller.bottle.index.reply);
  // 捞瓶子
  router.post('/bottle/addMyBottle', controller.bottle.index.addMyBottle);
  router.post('/bottle/dottleReplayList', controller.bottle.index.dottleReplayList);

  // 用户
  router.post('/user/myReply', controller.question.reply.myReply);
  router.post('/user/myArticle', controller.sys.article.myArticle);
  router.post('/user/myQuestions', controller.question.index.myQuestions);
  // 获取我的点赞评论表
  router.post('/user/getReplyStar', controller.question.reply.getMyReply);


  // 随机出题
  router.post('/subject/randomTest', controller.subject.testSubject.randomTest);
  router.post('/subject/testResult', controller.subject.testSubject.testResult);
  router.post('/subject/testHistory', controller.subject.testSubject.testHistory);

};


// const { title, pageNum = 1 } = this.ctx.request.body;

//     const querytables = [
//       {
//         table: 'questions',
//         keys: [ '*' ],
//         vagueCon: {},
//       },
//       {
//         table: 'sys_user',
//         keys: [ 'username', 'avatar' ],
//         leftJoinCon: [ 'questions.userId = sys_user.id' ],
//       },
//       {
//         table: 'user_similar',
//         keys: [ ],
//         totalKeys: [ 'count(user_similar.questionId) as count' ],
//         leftJoinCon: [ 'questions.id = user_similar.questionId' ],
//       },
//       // {
//       //   table: 'question_reply',
//       //   keys: [ ],
//       //   totalKeys: [ 'count(question_reply.questionId) as commentCount' ],
//       //   leftJoinCon: [ 'questions.id = question_reply.questionId' ],
//       // },
//     ];

//     if (title) {
//       querytables[0].vagueCon.title = title;
//     }

//     const res = await this.service.multiTableQuery(querytables, [], { pageNum, pageSize: 5 }, 'questions.id', 'commentCount desc');
//     if (res.code === 200) {
//       const { result, pageNum, total } = res.data;

//       let sqlRes = null;
//       let replySqlRes = null;
//       const map = {};

//       if (result.length) {
//         const sql = `select id, questionId from question_reply where questionId in (${result.map(i => `'${i.id}'`).join(',')})`;
//         const replySql = `select id, questionId from question_reply where replyId in (${result.map(i => `'${i.id}'`).join(',')})`;
//         sqlRes = await this.service.sql(sql);
//         replySqlRes = await this.service.sql(replySql);

//         sqlRes.forEach(i => {
//           if (map[i.questionId]) {
//             map[i.questionId] += 1;
//           } else {
//             map[i.questionId] = 1;
//           }
//         });
//         replySqlRes.forEach(i => {
//           if (map[i.questionId]) {
//             map[i.questionId] += 1;
//           } else {
//             map[i.questionId] = 1;
//           }
//         });
//       }
//       result.forEach(i => {
//         i.commentCount = (map[i.id] || 0);
//       });

//       this.success({ data: { data: result, pageNum, total } });
//       // this.success({ data: res.data });
//     } else {
//       this.error({ msg: '查询失败' });
//     }
