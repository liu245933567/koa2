// let gen;
// function* sectionListGrn() {
//   for (let i = 0; i < 8; i++) {
//     const fun = () => {
//       console.log(i);
//       if(gen) gen.next();
//     }
//     yield fun()
//   }
// }

// gen = sectionListGrn();
//这个模块里封装了所有对数据库的常用操作，不管数据库的什么操作，都需要连接数据库
var MongoClient = require("mongodb").MongoClient;
function _connectDB(callback) {
  var url = "mongodb://127.0.0.1:27017/haha";
  //链接数据库
  MongoClient.connect(url, function (err, db) {
    callback(err, db);
  });
}
//分页查找数据，找到所有数据
exports.findByFen = function (collectionName, data, C, D) {
  var result = [];   //结果数组
  if (arguments.length == 3) {
    var callback = C;
    var skipnumber = 0;
    var limit = 0;
  } else if (arguments.length == 4) {
    var callback = D;
    var args = C;
    var skipnumber = args.pageamount * args.page;
    var limit = args.pageamount;
  } else {
    throw new Error("函数参数个数不对");
    return;
  }

  //链接数据库
  _connectDB(function (err, db) {
    var cursor = db.collection(collectionName).find(data).skip(skipnumber).limit(limit);
    cursor.each(function (err, doc) {
      if (err) {
        callback(err, null);
        db.close();
        return;
      }
      if (doc != null) {
        result.push(doc);    //放入结果数组
      } else {
        //遍历结构，没有更多的文档了
        callback(null, result);
        db.close();
      }
    });
  });
}
