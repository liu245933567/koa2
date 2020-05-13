# 数据库操作记录

1. 修改 cartoon_list 插入我是大神仙漫画信息

```js
db.cartoon_list.insert({
  _id: 1204,
  cartoonId: 1204,
  collectionTag: "woshidashenxian",
  description:
    "年仅七岁却超速生长的短命神童时江，为恢复正常生活，带着寄宿体内的某位大神仙闯入仙界，从此走上成为仙界大亨的传奇之路…… 本作品周一周四双更，由于制作精度太高，偶尔断更会提前告知各位小伙伴（当然尽量不断更），感谢支持~ QQ一群：625133558",
  cartoonName: "我是大神仙",
  updataTime: "2020-05-12",
  coverImage: "http://i.zhongwei100.com/mh/cover/2019/11/19/1024879056.jpg/420",
});
```

1. 修改 cartoon_list 表中 \_id 值

```js
db.cartoon_list.find().forEach(function (u) {
  u._id = u.cartoonId;
  db.cartoon_list.save(u);
});
db.cartoon_list.deleteMany({ $where: "typeof this._id == 'object'" });
```

1. 删除 woshidashenxian 表中 \_id 为 object 类型的文档

```js
db.cartoon_woshidashenxian_section_list.deleteMany({
  $where: "typeof this._id == 'object'",
});
```

1. 修改 wushidashenxian 表中\_id 值

```js
db.cartoon_woshidashenxian_section_list.find().forEach(function (u) {
  u._id = u.sectionId;
  db.cartoon_woshidashenxian_section_list.save(u);
});
```

1. 更改键名

```js
db.test.update({}, { $rename: { title: "sectionTitle" } }, false, true);
```

1. 添加 sectionId 方法

```js
db.cartoon_woshidashenxian_section_list.find().forEach(function (u) {
  var match = u.sectionHref.match(/[0-9]{1,}.html/g);
  if (match[0]) {
    var sectionId = Number(match[0].slice(0, -5));
  } else {
    var sectionId = -1;
  }
  u.sectionId = sectionId;
  db.cartoon_woshidashenxian_section_list.save(u);
});
```
