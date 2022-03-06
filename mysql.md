## 我的 sys_user
+ id    自增id
+ 用户名
+ 手机号
+ 密码
+ 头像
+ 签名

+ 个人收藏
+ 退出登录

### 同感表 user_similar
+ id
+ userId
+ questionId

### 测试答题记录表 user_subject
+ id
+ typeId 字典类型id
+ score 分值
+ content 解析值

### 用户收藏文章表 user_article
+ id
+ userId 用户id
+ articleId 文章id

### 用户现拥有的瓶子 user_bottle
+ id
+ userId 用户id
+ bottleid 瓶子id

## 提问 questions
+ id
+ userId string 用户id
+ title string 标题
+ labels string[] 标签
+ desc string 描述

### 提问_用户关系表 user_question
+ id
+ userId
+ questionId

### question_reply
+ id
+ questionId 问题id
+ replyId 回复记录id（是否回复回复）
+ rUserId 回复者id
+ content 回复内容
+ createTime 创建时间

### 评论点赞关系表 user_reply
+ id
+ replyId
+ userId

## 发现
+ 心里测试
  ### 题目表 test_subject
  + id
  + title 题目表
  + typeId 字典类型id

  ### 题目答案表 subject_answer
  + id
  + subjectId 题目id
  + desc 描述
  + score 分值

  ### 题目解析表 subject_analysis
  + id
  + typeId 字典类型id
  + score 分值
  + direction 方向 1: <; 2 <=;  3: > 只能有一个大于和小于
  + content 解析值
  ```
    30  1
    60  2
    80  2
    90  3
    0 < 30 <= 60 <= 80 > 90
  ```

+ 推送
  ### article
  + id
  + title 文章标题
  + content 文章内容

## 漂流瓶
### 漂流瓶 drifting_bottle
+ id
+ userId 发出者
+ content 内容
+ status 1：漂流中 2：被捡到

### 漂流瓶回复 drifting_bottle_reply
+ id
+ bottleId 瓶子id
+ userId 回复者id
+ content 回复内容
+ createTime 创建时间

## 字典表 sys_dict
+ id
+ label
+ value

### 字典表 sys_dict_chindren
+ id
+ parentId
+ label
+ value