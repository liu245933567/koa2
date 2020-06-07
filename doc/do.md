- 删除初始化的文档

```js
db.cartoons.deleteOne({ _id: 1 });
```

- 删除\_\_v

```js
db.cartoons.update({"__v":{"$exists":true}},{"$unset":{"__v":""}}, false,true);
```
