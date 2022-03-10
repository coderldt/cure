-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: 180.76.173.85    Database: cure
-- ------------------------------------------------------
-- Server version	5.7.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `title` varchar(20) DEFAULT NULL COMMENT '标题',
  `content` longtext COMMENT '内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='文章';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (2,'如何成为人中龙凤','<p>问的好</p>'),(3,'不想成为人中龙凤','不想成为人中龙凤'),(5,'前端简述','<dl class=\"lemmaWgt-lemmaTitle lemmaWgt-lemmaTitle-\">\n<dd class=\"lemmaWgt-lemmaTitle-title J-lemma-title\" data-pid=\"0\">\n<h1>前端</h1>\n&nbsp;&nbsp;<a class=\"cmn-btn-28 cmn-btn-hover-blue audio-play title-audio-play J-title-audio-play\"><span class=\"J-audio-text\">播报</span></a>&nbsp;<a class=\"edit-lemma cmn-btn-hover-blue cmn-btn-28 j-edit-link\">编辑</a>&nbsp;<a class=\"lemma-discussion cmn-btn-hover-blue cmn-btn-28 j-discussion-link\" href=\"https://baike.baidu.com/planet/talk?lemmaId=5956545\" target=\"_blank\" rel=\"noopener\">讨论</a>&nbsp;<a class=\"add-video cmn-btn-hover-blue cmn-btn-28 J-add-video-link J-add-video\">上传视频</a></dd>\n</dl>\n<div class=\"lemma-summary\">\n<div class=\"para\" data-pid=\"1\">前端即<a href=\"https://baike.baidu.com/item/%E7%BD%91%E7%AB%99%E5%89%8D%E5%8F%B0/4849916\" target=\"_blank\" rel=\"noopener\" data-lemmaid=\"4849916\">网站前台</a>部分，运行在<a href=\"https://baike.baidu.com/item/PC/107\" target=\"_blank\" rel=\"noopener\" data-lemmaid=\"107\">PC</a>端，<a href=\"https://baike.baidu.com/item/%E7%A7%BB%E5%8A%A8/22826\" target=\"_blank\" rel=\"noopener\" data-lemmaid=\"22826\">移动</a>端等<a href=\"https://baike.baidu.com/item/%E6%B5%8F%E8%A7%88%E5%99%A8/213911\" target=\"_blank\" rel=\"noopener\" data-lemmaid=\"213911\">浏览器</a>上展现给用户浏览的网页。随着<a href=\"https://baike.baidu.com/item/%E4%BA%92%E8%81%94%E7%BD%91%E6%8A%80%E6%9C%AF/617749\" target=\"_blank\" rel=\"noopener\" data-lemmaid=\"617749\">互联网技术</a>的发展，HTML5，<a href=\"https://baike.baidu.com/item/CSS3/4059544\" target=\"_blank\" rel=\"noopener\" data-lemmaid=\"4059544\">CSS3</a>，前端框架的应用，<a href=\"https://baike.baidu.com/item/%E8%B7%A8%E5%B9%B3%E5%8F%B0/8558902\" target=\"_blank\" rel=\"noopener\" data-lemmaid=\"8558902\">跨平台</a>响应式网页设计能够适应各种屏幕分辨率，合适的动效设计，给用户带来极高的用户体验。<sup class=\"sup--normal\" data-sup=\"1\" data-ctrmap=\":1,\">&nbsp;</sup></div>\n</div>\n<div class=\"lemmaWgt-promotion-leadPVBtn\">&nbsp;</div>\n<div class=\"basic-info J-basic-info cmn-clearfix\" data-pid=\"card\">&nbsp;</div>\n<div class=\"lemmaWgt-lemmaCatalog\">\n<div class=\"lemma-catalog\">\n<h2 class=\"block-title\">目录</h2>\n<div class=\"catalog-list column-1\">\n<ol>\n<li class=\"level1\"><span class=\"index\">1</span>&nbsp;<span class=\"text\"><a href=\"https://baike.baidu.com/item/%E5%89%8D%E7%AB%AF/5956545?fr=aladdin#1\">网站前端</a></span></li>\n<li class=\"level1\"><span class=\"index\">2</span>&nbsp;<span class=\"text\"><a href=\"https://baike.baidu.com/item/%E5%89%8D%E7%AB%AF/5956545?fr=aladdin#2\">核心技术</a></span></li>\n</ol>\n</div>\n</div>\n</div>\n<div class=\"anchor-list \"><a class=\"lemma-anchor para-title\" name=\"1\"></a><a class=\"lemma-anchor \" name=\"sub8059258_1\"></a><a class=\"lemma-anchor \" name=\"网站前端\"></a></div>\n<div class=\"para-title level-2  J-chapter\" data-index=\"1\" data-pid=\"2\">\n<h2 class=\"title-text\">网站前端</h2>\n<a class=\"edit-icon j-edit-link\" data-edit-dl=\"1\">编辑</a><a class=\"audio-play part-audio-play J-part-audio-play\">&nbsp;<span class=\"J-part-audio-text\">播报</span></a></div>\n<div class=\"para\" data-pid=\"3\">前端技术一般分为前端设计和<a href=\"https://baike.baidu.com/item/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91\" target=\"_blank\" rel=\"noopener\">前端开发</a>，前端设计一般可以理解为网站的<a href=\"https://baike.baidu.com/item/%E8%A7%86%E8%A7%89%E8%AE%BE%E8%AE%A1/198178\" target=\"_blank\" rel=\"noopener\" data-lemmaid=\"198178\">视觉设计</a>，前端开发则是网站的前台代码实现，包括基本的HTML和CSS以及JavaScript/ajax，最新的高级版本HTML5、CSS3，以及<a href=\"https://baike.baidu.com/item/SVG/63178\" target=\"_blank\" rel=\"noopener\" data-lemmaid=\"63178\">SVG</a>等。</div>\n<div class=\"anchor-list \"><a class=\"lemma-anchor para-title\" name=\"2\"></a><a class=\"lemma-anchor \" name=\"sub8059258_2\"></a><a class=\"lemma-anchor \" name=\"核心技术\"></a></div>\n<div class=\"para-title level-2  J-chapter\" data-index=\"2\" data-pid=\"4\">\n<h2 class=\"title-text\">核心技术</h2>\n<a class=\"edit-icon j-edit-link\" data-edit-dl=\"2\">编辑</a><a class=\"audio-play part-audio-play J-part-audio-play\">&nbsp;<span class=\"J-part-audio-text\">播报</span></a></div>\n<div class=\"para\" data-pid=\"5\"><a href=\"https://baike.baidu.com/item/HTML\" target=\"_blank\" rel=\"noopener\">HTML</a>、CSS、<a href=\"https://baike.baidu.com/item/JavaScript\" target=\"_blank\" rel=\"noopener\">JavaScript</a></div>\n<div class=\"para\" data-pid=\"6\">这三个是前端开发中最基本也是最必须的三个技能。前端的开发中，在页面的布局时， HTML将元素进行定义，CSS对展示的元素进行定位，再通过JavaScript实现相应的效果和交互。虽然表面看起来很简单，但这里面需要掌握的东西绝对不会少。在进行开发前，需要对这些概念弄清楚、弄明白，这样在开发的过程中才会得心应手。</div>\n<div class=\"para\" data-pid=\"7\">HTML</div>\n<div class=\"para\" data-pid=\"8\">指的是<a href=\"https://baike.baidu.com/item/%E8%B6%85%E6%96%87%E6%9C%AC%E6%A0%87%E8%AE%B0%E8%AF%AD%E8%A8%80/6972570\" target=\"_blank\" rel=\"noopener\" data-lemmaid=\"6972570\">超文本标记语言</a>&nbsp;(Hyper Text Markup Language)，这个也是我们网页最常用普通的语言了，经历了多个版本的发展，已经发展到5.0版了，得力于W3C建立的标准和规范，已普遍升级到了XHTML，XHTML 指可扩展超文本标签语言（EXtensible HyperText Markup Language）， XHTML 于2000年的1月26日成为 W3C 标准，是更严格更纯净的 HTML 代码，XHTML 的目标是取代 HTML。XHTML 与 HTML 4.01 几乎是相同的，XHTML 是作为一种 XML 应用被重新定义的 HTML，是一个 W3C 标准。W3C 将 XHTML 定义为最新的HTML版本。所有新的浏览器都支持 XHTML。</div>\n<div class=\"para\" data-pid=\"9\">CSS</div>\n<div class=\"para\" data-pid=\"10\">级联样式表（Cascading Style Sheet）简称&ldquo;CSS&rdquo;，通常又称为&ldquo;风格样式表（Style Sheet）&rdquo;，它是用来进行网页风格设计的。比如，如果想让链接字未点击时是蓝色的，当鼠标移上去后字变成红色的且有下划线，这就是一种风格。通过设立样式表，可以统一地控制HTML中各标志的显示属性。<a href=\"https://baike.baidu.com/item/%E7%BA%A7%E8%81%94%E6%A0%B7%E5%BC%8F%E8%A1%A8/4312047\" target=\"_blank\" rel=\"noopener\" data-lemmaid=\"4312047\">级联样式表</a>可以使人更能有效地控制网页外观。使用级联样式表，可以扩充精确指定网页元素位置，外观以及创建特殊效果的能力。</div>\n<div class=\"para\" data-pid=\"11\">JavaScript</div>\n<div class=\"para\" data-pid=\"12\">是一种由<a href=\"https://baike.baidu.com/item/Netscape\" target=\"_blank\" rel=\"noopener\">Netscape</a>的<a href=\"https://baike.baidu.com/item/LiveScript\" target=\"_blank\" rel=\"noopener\">LiveScript</a>发展而来的原型化继承的<a href=\"https://baike.baidu.com/item/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1\" target=\"_blank\" rel=\"noopener\">面向对象</a>的动态类型的区分大小写的客户端<a href=\"https://baike.baidu.com/item/%E8%84%9A%E6%9C%AC%E8%AF%AD%E8%A8%80\" target=\"_blank\" rel=\"noopener\">脚本语言</a>，主要目的是为了解决服务器端语言，比如<a href=\"https://baike.baidu.com/item/Perl\" target=\"_blank\" rel=\"noopener\">Perl</a>，遗留的速度问题，为客户提供更流畅的浏览效果。当时服务端需要对数据进行验证，由于<a href=\"https://baike.baidu.com/item/%E7%BD%91%E7%BB%9C%E9%80%9F%E5%BA%A6\" target=\"_blank\" rel=\"noopener\">网络速度</a>相当缓慢，只有28.8kbps，验证步骤浪费的时间太多。于是Netscape的浏览器Navigator加入了Javascript，提供了<a href=\"https://baike.baidu.com/item/%E6%95%B0%E6%8D%AE%E9%AA%8C%E8%AF%81\" target=\"_blank\" rel=\"noopener\">数据验证</a>的基本功能。</div>');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drifting_bottle`
--

DROP TABLE IF EXISTS `drifting_bottle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drifting_bottle` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userId` int(11) DEFAULT NULL COMMENT '用户id',
  `content` varchar(60) DEFAULT NULL COMMENT '瓶子内容',
  `status` int(11) DEFAULT NULL COMMENT '状态1：漂流中 2：被捡到',
  PRIMARY KEY (`id`),
  KEY `drifting_bottle_FK` (`userId`),
  CONSTRAINT `drifting_bottle_FK` FOREIGN KEY (`userId`) REFERENCES `sys_user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='漂流瓶';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drifting_bottle`
--

LOCK TABLES `drifting_bottle` WRITE;
/*!40000 ALTER TABLE `drifting_bottle` DISABLE KEYS */;
INSERT INTO `drifting_bottle` VALUES (1,1,'叫个朋友啊',2),(2,1,'有人吗',2),(3,1,'有人回应我吗',2),(4,1,'有人回应我吗,笨蛋',2),(5,2,'真的是笨蛋',2),(6,2,'真的是笨蛋',1);
/*!40000 ALTER TABLE `drifting_bottle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drifting_bottle_reply`
--

DROP TABLE IF EXISTS `drifting_bottle_reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drifting_bottle_reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `bottleId` int(11) DEFAULT NULL COMMENT '瓶子id',
  `userId` int(11) DEFAULT NULL COMMENT '用户id',
  `content` varchar(60) DEFAULT NULL COMMENT '回复内容',
  `createTime` varchar(20) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `drifting_bottle_reply_FK` (`userId`),
  KEY `drifting_bottle_reply_FK_1` (`bottleId`),
  CONSTRAINT `drifting_bottle_reply_FK` FOREIGN KEY (`userId`) REFERENCES `sys_user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `drifting_bottle_reply_FK_1` FOREIGN KEY (`bottleId`) REFERENCES `drifting_bottle` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='漂流瓶回复';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drifting_bottle_reply`
--

LOCK TABLES `drifting_bottle_reply` WRITE;
/*!40000 ALTER TABLE `drifting_bottle_reply` DISABLE KEYS */;
INSERT INTO `drifting_bottle_reply` VALUES (1,1,1,'你好啊，交个朋友','2022-03-08 23:49:52'),(2,6,1,'爆个照片，我就加你好友','2022-03-09 23:35:27');
/*!40000 ALTER TABLE `drifting_bottle_reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_reply`
--

DROP TABLE IF EXISTS `question_reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question_reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `questionId` int(11) DEFAULT NULL COMMENT '问题id',
  `replyId` int(11) DEFAULT NULL COMMENT '回复评论id 可为null',
  `rUserId` int(11) DEFAULT NULL COMMENT '评论者id',
  `content` varchar(50) DEFAULT NULL COMMENT '内容',
  `createTime` varchar(20) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `question_reply_FK` (`rUserId`),
  KEY `question_reply_FK_1` (`questionId`),
  CONSTRAINT `question_reply_FK` FOREIGN KEY (`rUserId`) REFERENCES `sys_user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `question_reply_FK_1` FOREIGN KEY (`questionId`) REFERENCES `questions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='提问评论表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_reply`
--

LOCK TABLES `question_reply` WRITE;
/*!40000 ALTER TABLE `question_reply` DISABLE KEYS */;
INSERT INTO `question_reply` VALUES (2,2,1,1,'你只知道一知半解，我来告诉你全部真相','2022-03-08 21:43:57'),(3,3,NULL,1,'楼上真的太无知了。','2022-03-08 21:44:16');
/*!40000 ALTER TABLE `question_reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userId` int(11) DEFAULT NULL COMMENT '用户id',
  `title` varchar(40) DEFAULT NULL COMMENT '标题',
  `labels` varchar(100) DEFAULT NULL COMMENT '标签',
  `desc` varchar(100) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`),
  KEY `questions_FK` (`userId`),
  CONSTRAINT `questions_FK` FOREIGN KEY (`userId`) REFERENCES `sys_user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='提问表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (2,1,'我第二问题，你们都好好回答','','没听到'),(3,1,'2','','听到没'),(4,1,'3','','听到没'),(5,2,'4','','听到没'),(6,2,'5','','1'),(7,2,'6','','听到没'),(8,1,'7','','听到没'),(9,2,'8','','听到没'),(10,2,'9','','听到没'),(11,2,'10','','听到没'),(12,2,'我来发起提问','','听到没');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject_analysis`
--

DROP TABLE IF EXISTS `subject_analysis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subject_analysis` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `typeId` varchar(20) DEFAULT NULL COMMENT '字典类型id',
  `score` int(11) DEFAULT NULL COMMENT '分值',
  `direction` int(11) DEFAULT NULL COMMENT '方向 1: <; 2 <=;  3: > 只能有一个大于和小于',
  `content` varchar(100) DEFAULT NULL COMMENT '解析内容',
  PRIMARY KEY (`id`),
  KEY `subject_analysis_FK` (`typeId`),
  CONSTRAINT `subject_analysis_FK` FOREIGN KEY (`typeId`) REFERENCES `sys_dict_chindren` (`value`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='题目解析表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject_analysis`
--

LOCK TABLES `subject_analysis` WRITE;
/*!40000 ALTER TABLE `subject_analysis` DISABLE KEYS */;
INSERT INTO `subject_analysis` VALUES (2,'5-3',5,1,'你性格很好，别担心了'),(4,'5-3',100,3,'你性格很好，别担心了。。。'),(6,'5-3',20,2,'你好，我好，全家好'),(7,'5-3',30,2,'你牛，你才是大人物');
/*!40000 ALTER TABLE `subject_analysis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject_answer`
--

DROP TABLE IF EXISTS `subject_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subject_answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `subjectId` int(11) DEFAULT NULL COMMENT '题目id',
  `desc` varchar(40) DEFAULT NULL COMMENT '选项描述',
  `score` int(11) DEFAULT NULL COMMENT '选项分数',
  PRIMARY KEY (`id`),
  KEY `subject_answer_FK` (`subjectId`),
  CONSTRAINT `subject_answer_FK` FOREIGN KEY (`subjectId`) REFERENCES `test_subject` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8 COMMENT='题目答案表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject_answer`
--

LOCK TABLES `subject_answer` WRITE;
/*!40000 ALTER TABLE `subject_answer` DISABLE KEYS */;
INSERT INTO `subject_answer` VALUES (1,4,'你觉得他是很好的条件',20),(4,4,'我非常赞同这个观点',60),(5,4,'我超级赞同这个观点',80),(6,4,'我不赞同他的观点',100),(7,7,'我很开心',20),(8,7,'我不开心',40),(9,6,'12',1),(10,11,'没有',20),(11,11,'轻度',40),(12,11,'中度',60),(13,11,'严重',100),(14,12,'没有',20),(15,12,'轻度',40),(16,12,'中度',60),(17,12,'严重',100),(18,13,'没有',20),(19,13,'轻度',40),(20,13,'中度',60),(21,13,'严重',100),(22,14,'没有',20),(23,14,'轻度',40),(24,14,'中度',60),(25,14,'严重',100),(26,15,'没有',20),(27,15,'轻度',40),(28,15,'中度',60),(29,15,'严重',100),(30,16,'没有',20),(31,16,'轻度',40),(32,16,'中度',60),(33,16,'严重',100),(34,17,'没有',20),(35,17,'轻度',40),(36,17,'中度',60),(37,17,'严重',100),(38,18,'没有',20),(39,18,'轻度',40),(40,18,'中度',60),(41,18,'严重',100),(42,19,'没有',20),(43,19,'轻度',40),(44,19,'中度',60),(45,19,'严重',100),(46,20,'没有',20),(47,20,'轻度',40),(48,20,'中度',60),(49,20,'严重',100),(50,21,'没有',20),(51,21,'轻度',40),(52,21,'中度',60),(53,21,'严重',100);
/*!40000 ALTER TABLE `subject_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_dict`
--

DROP TABLE IF EXISTS `sys_dict`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_dict` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `label` varchar(20) DEFAULT NULL COMMENT '中文名称',
  `value` varchar(20) DEFAULT NULL COMMENT '值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COMMENT='字典';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_dict`
--

LOCK TABLES `sys_dict` WRITE;
/*!40000 ALTER TABLE `sys_dict` DISABLE KEYS */;
INSERT INTO `sys_dict` VALUES (5,'题目分类','subject'),(6,'职位分类','role'),(11,'学校类型','school_type'),(13,'游戏分类','game'),(15,'问题类型','questionType');
/*!40000 ALTER TABLE `sys_dict` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_dict_chindren`
--

DROP TABLE IF EXISTS `sys_dict_chindren`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_dict_chindren` (
  `value` varchar(20) NOT NULL COMMENT '值',
  `parentId` int(11) DEFAULT NULL COMMENT '父类id',
  `label` varchar(20) DEFAULT NULL COMMENT '中午标签',
  PRIMARY KEY (`value`),
  KEY `sys_dict_chindren_FK` (`parentId`),
  CONSTRAINT `sys_dict_chindren_FK` FOREIGN KEY (`parentId`) REFERENCES `sys_dict` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='字典二级';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_dict_chindren`
--

LOCK TABLES `sys_dict_chindren` WRITE;
/*!40000 ALTER TABLE `sys_dict_chindren` DISABLE KEYS */;
INSERT INTO `sys_dict_chindren` VALUES ('1',13,'王者荣耀'),('2',13,'英雄联盟'),('211',11,'211'),('3',13,'吃鸡'),('5-1',5,'抑郁类'),('5-2',5,'乐观派'),('5-3',5,'想入非非派'),('985',11,'985'),('bg',15,'悲观'),('bqi',15,'不清楚'),('lg',15,'乐观'),('wildChicken',11,'野鸡大学');
/*!40000 ALTER TABLE `sys_dict_chindren` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user`
--

DROP TABLE IF EXISTS `sys_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `username` varchar(8) DEFAULT NULL COMMENT '用户名',
  `phone` varchar(100) DEFAULT NULL COMMENT '电话',
  `password` varchar(64) DEFAULT NULL COMMENT '密码',
  `avatar` varchar(100) DEFAULT NULL COMMENT '头像',
  `autograph` varchar(60) DEFAULT NULL COMMENT '签名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user`
--

LOCK TABLES `sys_user` WRITE;
/*!40000 ALTER TABLE `sys_user` DISABLE KEYS */;
INSERT INTO `sys_user` VALUES (1,'sky.','18735674692','123456','123','你是我的'),(2,NULL,'18735674691','123456',NULL,NULL);
/*!40000 ALTER TABLE `sys_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_subject`
--

DROP TABLE IF EXISTS `test_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_subject` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `title` varchar(40) DEFAULT NULL COMMENT '题目',
  `typeId` varchar(20) DEFAULT NULL COMMENT '测试题目分类',
  PRIMARY KEY (`id`),
  KEY `test_subject_FK` (`typeId`),
  CONSTRAINT `test_subject_FK` FOREIGN KEY (`typeId`) REFERENCES `sys_dict_chindren` (`value`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COMMENT='题目表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_subject`
--

LOCK TABLES `test_subject` WRITE;
/*!40000 ALTER TABLE `test_subject` DISABLE KEYS */;
INSERT INTO `test_subject` VALUES (4,'你如何看待抑郁症啊','5-3'),(6,'我不看抑郁症','5-1'),(7,'你真的开心吗','5-3'),(10,'觉得自已如何','5-3'),(11,'泄气：你是否感到前景渺茫?','5-3'),(12,'你是否觉得自己没有价值或自以为是一个失败者?','5-3'),(13,'你是否觉得力不从心或自叹比不上别人?','5-3'),(14,'你是否对任何事都自责?','5-3'),(15,'这段时间你是否一直处于愤怒和不满状态?','5-3'),(16,'你对事业、家庭、爱好或朋友是否丧失了兴趣?','5-3'),(17,'你是否感到一蹶不振做事情毫无动力?','5-3'),(18,'你是否以为自己已衰老或失去魅力?','5-3'),(19,'你是否感到食欲不振或情不自禁地暴饮暴食?','5-3'),(20,'你是否患有失眠症或整天感到体力不支、昏昏欲睡?','5-3'),(21,'你是否丧失了对性的兴趣?','5-3');
/*!40000 ALTER TABLE `test_subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_article`
--

DROP TABLE IF EXISTS `user_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userId` int(11) DEFAULT NULL COMMENT '用户id',
  `articleId` int(11) DEFAULT NULL COMMENT '文章id',
  PRIMARY KEY (`id`),
  KEY `user_article_FK` (`userId`),
  KEY `user_article_FK_1` (`articleId`),
  CONSTRAINT `user_article_FK` FOREIGN KEY (`userId`) REFERENCES `sys_user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_article_FK_1` FOREIGN KEY (`articleId`) REFERENCES `article` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='用户收藏文章';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_article`
--

LOCK TABLES `user_article` WRITE;
/*!40000 ALTER TABLE `user_article` DISABLE KEYS */;
INSERT INTO `user_article` VALUES (5,1,5);
/*!40000 ALTER TABLE `user_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_bottle`
--

DROP TABLE IF EXISTS `user_bottle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_bottle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `bottleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_bottle_FK` (`userId`),
  KEY `user_bottle_FK_1` (`bottleId`),
  CONSTRAINT `user_bottle_FK` FOREIGN KEY (`userId`) REFERENCES `sys_user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_bottle_FK_1` FOREIGN KEY (`bottleId`) REFERENCES `drifting_bottle` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='用户当前瓶子';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_bottle`
--

LOCK TABLES `user_bottle` WRITE;
/*!40000 ALTER TABLE `user_bottle` DISABLE KEYS */;
INSERT INTO `user_bottle` VALUES (4,1,1),(5,1,3),(6,1,5),(7,1,4),(9,1,2);
/*!40000 ALTER TABLE `user_bottle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_question`
--

DROP TABLE IF EXISTS `user_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userId` int(11) DEFAULT NULL COMMENT '用户id',
  `questionId` int(11) DEFAULT NULL COMMENT '问题id',
  PRIMARY KEY (`id`),
  KEY `user_question_FK` (`userId`),
  KEY `user_question_FK_1` (`questionId`),
  CONSTRAINT `user_question_FK` FOREIGN KEY (`userId`) REFERENCES `sys_user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_question_FK_1` FOREIGN KEY (`questionId`) REFERENCES `questions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='用户提问关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_question`
--

LOCK TABLES `user_question` WRITE;
/*!40000 ALTER TABLE `user_question` DISABLE KEYS */;
INSERT INTO `user_question` VALUES (4,1,2);
/*!40000 ALTER TABLE `user_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_reply`
--

DROP TABLE IF EXISTS `user_reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `replyId` int(11) DEFAULT NULL COMMENT '评论id',
  `userId` int(11) DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY (`id`),
  KEY `user_reply_FK` (`userId`),
  KEY `user_reply_FK_1` (`replyId`),
  CONSTRAINT `user_reply_FK` FOREIGN KEY (`userId`) REFERENCES `sys_user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_reply_FK_1` FOREIGN KEY (`replyId`) REFERENCES `question_reply` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='评论点赞关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_reply`
--

LOCK TABLES `user_reply` WRITE;
/*!40000 ALTER TABLE `user_reply` DISABLE KEYS */;
INSERT INTO `user_reply` VALUES (1,2,1);
/*!40000 ALTER TABLE `user_reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_similar`
--

DROP TABLE IF EXISTS `user_similar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_similar` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userId` int(11) DEFAULT NULL COMMENT '用户id',
  `questionId` int(11) DEFAULT NULL COMMENT '问题id',
  PRIMARY KEY (`id`),
  KEY `user_similar_FK_1` (`userId`),
  KEY `user_similar_FK` (`questionId`),
  CONSTRAINT `user_similar_FK` FOREIGN KEY (`questionId`) REFERENCES `questions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_similar_FK_1` FOREIGN KEY (`userId`) REFERENCES `sys_user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='提问同感表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_similar`
--

LOCK TABLES `user_similar` WRITE;
/*!40000 ALTER TABLE `user_similar` DISABLE KEYS */;
INSERT INTO `user_similar` VALUES (2,1,3),(3,1,4),(5,1,5),(6,2,5);
/*!40000 ALTER TABLE `user_similar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_subject`
--

DROP TABLE IF EXISTS `user_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_subject` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `typeId` varchar(20) DEFAULT NULL COMMENT '类型id',
  `score` int(11) DEFAULT NULL COMMENT '分值',
  `content` varchar(100) DEFAULT NULL COMMENT '解析内容',
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_subject_FK` (`typeId`),
  KEY `user_subject_FK_1` (`userId`),
  CONSTRAINT `user_subject_FK` FOREIGN KEY (`typeId`) REFERENCES `sys_dict_chindren` (`value`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_subject_FK_1` FOREIGN KEY (`userId`) REFERENCES `sys_user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='用户测试历史记录';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_subject`
--

LOCK TABLES `user_subject` WRITE;
/*!40000 ALTER TABLE `user_subject` DISABLE KEYS */;
INSERT INTO `user_subject` VALUES (1,'5-3',1000,'你性格很好，别担心了。。。',1),(2,'5-3',5,'你性格很好，别担心了',1);
/*!40000 ALTER TABLE `user_subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'cure'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-10 23:09:19
