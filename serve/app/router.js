'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.prefix('/cureApi');
  router.post('/login', controller.sys.user.login);
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

  router.post('/testSubject/list', controller.subject.testSubject.list);
  router.post('/testSubject/add', controller.subject.testSubject.add);
  router.post('/testSubject/update', controller.subject.testSubject.update);
  router.post('/testSubject/delete', controller.subject.testSubject.delete);

  router.post('/subjectAnswer/list', controller.subject.subjectAnswer.list);
  router.post('/subjectAnswer/add', controller.subject.subjectAnswer.add);
  router.post('/subjectAnswer/update', controller.subject.subjectAnswer.update);
  router.post('/subjectAnswer/delete', controller.subject.subjectAnswer.delete);

  router.post('/subjectAnalysis/list', controller.subject.subjectAnalysis.list);
  router.post('/subjectAnalysis/add', controller.subject.subjectAnalysis.add);
  router.post('/subjectAnalysis/update', controller.subject.subjectAnalysis.update);
  router.post('/subjectAnalysis/delete', controller.subject.subjectAnalysis.delete);
  // router.post('/upload', controller.tools.upload.upload);

  // APP
  router.post('/question/list', controller.question.index.list);
  router.post('/question/add', controller.question.index.add);
  router.post('/question/update', controller.question.index.update);
  router.post('/question/delete', controller.question.index.delete);

};
