# 数据库操作记录

1. 修改 cartoon_list 表中_id值

```js
db.cartoon_list.find().forEach(function (u) {
  u._id = u.cartoonId;
  db.cartoon_list.save(u);
});
db.cartoon_list.deleteMany({$where:"typeof this._id == 'object'"})
```

1. 删除 woshidashenxian 表中 _id 为 object 类型的文档

```js
db.cartoon_woshidashenxian_section_list.deleteMany({$where:"typeof this._id == 'object'"})
```

1. 修改 wushidashenxian 表中_id值

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
