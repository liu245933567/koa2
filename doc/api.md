# 接口说明

## 动漫

### 动漫列表查询

请求 URL: /cartoon/cartoonList.json

---

请求方式: POST

---

| 参数名 | 类型 | 说明 |
| :----- | ---: | :--: |
| null   | null | null |

返回实例

```json
{
  "isOk": true,
  "code": 200,
  "message": "success",
  "cartoonList": [
    {
      "id": 196,
      "cartoonName": "戒魔人",
      "description": "大一新生周小安偶然戴上一枚来历不明的商代戒指，从他口中吐出了一个恐怖的血魔人。一个人类历史上的惊天秘密随即揭开……每周三、六更新，Q群: 425311792"
    },
    {
      "id": 243,
      "cartoonName": "妖神记",
      "description": "妖神一出，谁与争锋？ 这是一个妖灵的世界，融合了妖灵，就可以成为强大的妖灵师。 因为一本时空妖灵之书，时空发生了扭转，当一切重新开始之时，命运之轮缓缓转动。"
    }
  ]
}
```

### 动漫详情查询

请求 URL: /cartoon/cartoonDetail.json

---

请求方式: POST

---

| 参数名    |   类型 |  说明   |
| :-------- | -----: | :-----: |
| cartoonId | number | 卡通 Id |

返回实例

```json
{
  "isOk": true,
  "code": 200,
  "message": "success",
  "cartoonDetail": {
    "cartoonInfo": {
      "cartoonName": "戒魔人",
      "updataTime": "2020-05-19T16:00:00.000Z",
      "coverImage": "http://i.zhongwei100.com/mh/cover/2019/11/19/10986b708c.jpg/420",
      "description": "大一新生周小安偶然戴上一枚来历不明的商代戒指，从他口中吐出了一个恐怖的血魔人。一个人类历史上的惊天秘密随即揭开……每周三、六更新，Q群: 425311792"
    },
    "sectionList": [
      {
        "sectionId": 361956,
        "sectionTitle": "第637话 荷花大王",
        "cartoonId": 196
      },
      {
        "sectionId": 361154,
        "sectionTitle": "第636话 不计成本的战斗",
        "cartoonId": 196
      },
      {
        "sectionId": 359454,
        "sectionTitle": "第635话 爷有的是矿",
        "cartoonId": 196
      }
    ]
  }
}
```

### 章节详情查询

请求 URL: /cartoon/cartoonDetail.json

---

请求方式: POST

---

| 参数名    |   类型 |  说明   |
| :-------- | -----: | :-----: |
| cartoonId | number | 卡通 Id |
| sectionId | number | 章节 Id |

返回实例

```json
{
  "isOk": true,
  "code": 200,
  "message": "success",
  "sectionDetail": {
    "sectionId": 11035,
    "sectionTitle": "第1话",
    "cartoonId": 196,
    "imagesList": [
      "http://res.img.fffimage.com/images/2019/12/05/04/11e0fef466.jpg/0",
      "http://res.img.fffimage.com/images/2019/12/05/04/11d6021d42.jpg/0",
      "http://res.img.fffimage.com/images/2019/12/05/04/11bc51b521.jpg/0",
      "http://res.img.fffimage.com/images/2019/12/05/04/11c5ce13bb.jpg/0"
    ]
  }
}
```
