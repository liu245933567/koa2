const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'itying';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("连接数据库成功");
  const db = client.db(dbName);
  //  查询
  db.collection("user").insertOne(body, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('增加数据成功');
    res.send('增加数据成功')
  })
})

// Use connect method to connect to the Server
client.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("连接数据库成功");

  const db = client.db(dbName);

  /** 操作完数据库后一定要关闭 */
  //  查询
  // db.collection("user").find({}).toArray((err, data) => {
  //   console.log(data);
  //   client.close();
  // })
  // 增加
  // db.collection("user").insertOne({name: '李四', age: 12}, (err, result) => {
  //   if(err){
  //     console.log("添加失败")
  //     return;
  //   }
  //   console.log('增加成功');
  //   console.log(result);
  //   client.close(); 
  // })

  // 修改
  // db.collection('user').updateOne({ name: '张三' }, { $set: { age: 10 } }, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   console.log('修改成功');
  //   console.log(result);
  //   client.close();
  // })

  // 删除数据
  db.collection('user').deleteOne({ name: '李四' }, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('删除一条成功');
    client.close();
  })
});
