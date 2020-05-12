# 数据库操作记录

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
