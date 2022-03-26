## 我的 sys_user
+ id    自增id
+ 手机号 唯一
+ 密码
+ 用户名
+ 头像
+ 签名

+ 个人收藏
+ 退出登录

### 同感表 user_similar // 作用在主页同感信息回显依据
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
+ id 自增
+ userId string 用户id 用来关联sys_user表，可以在每次查询问题的时候，获取到用户最新的信息
+ title string 标题
+ labels string[] 标签
+ desc string 描述

### 提问_用户关系表 user_question // 我的页面中，我的提问进行数据回显
+ id
+ userId
+ questionId

### question_reply
+ id
+ questionId 问题id
+ replyId 回复记录id（是否回复回复） 可以为空
+ rUserId 回复者id
+ content 回复内容
+ createTime 创建时间

### 评论用户点赞关系表 user_reply // 作用：主页点赞状态信息回显的依据
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
  + direction 方向 1: <; 2 <=;  3: > 只能有一个大于和小于 // 人为的去约束
  + content 解析值
  ```
    30  1
    60  2
    80  2
    90  3
    0 < 30 <= 60 <= 80 >= 90
  ```

+ 推送
  ### article
  + id
  + title 文章标题
  + content 文章内容

## 漂流瓶
### 漂流瓶 drifting_bottle
+ id
+ userId 发出者 // 没用
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