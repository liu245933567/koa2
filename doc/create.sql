/* 创建user表 */
CREATE TABLE user (
  phone INT PRIMARY KEY COMMENT '手机号',
  PASSWORD VARCHAR(30) COMMENT '密码',
  email VARCHAR(70) COMMENT '邮箱',
  nickname VARCHAR(30) COMMENT '用户昵称',
  gender VARCHAR(20) COMMENT '性别',
  headPortrait VARCHAR(200) COMMENT '头像地址',
  brithday DATE COMMENT '出生日期'
);

/* 查询是否有要插入的用户信息 */
SELECT
  COUNT(*) AS count
FROM
  user
WHERE
  phone = 17862514397;

/* 插入用户信息 */
INSERT INTO user VALUES ()