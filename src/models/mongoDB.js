// 引入MongoDB数据库模块
const MongoDB = require('mongodb'),
  // 获得数据库客户端
  MongoClient = MongoDB.MongoClient,
  // 获取操作数据库ID的方法
  ObjectID = MongoDB.ObjectID;
// 引入数据库的配置文件
const { dbConfig } = require('../config');

class DB {
  // 单例模式，解决多次实例化实例不共享的问题
  static getInstance() {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }
  constructor() {
    this.dbClient = '';
    // 实例化的时候就连接数据库，解决第一次查询太久的问题
    this.connect();
  }
  // 连接数据库
  connect() {
    let that = this;

    return new Promise((resolve, reject) => {
      //  解决数据库多次连接的问题
      if (!that.dbClient) {
        MongoClient.connect(
          `mongodb://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}/${dbConfig.database}`,
          // `mongodb://${dbConfig.host}`,
          { useNewUrlParser: true, useUnifiedTopology: true },
          (err, client) => {
            if (err) {
              reject(err);
            } else {
              that.dbClient = client.db(dbConfig.database);
              resolve(that.dbClient);
            }
          });
      } else {
        resolve(that.dbClient);
      }
    });
  }
  // 查找方法
  find(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        var result = db.collection(collectionName).find(json);

        result.toArray(function (err, doc) {
          if (err) {
            reject(err);
            return;
          }
          resolve(doc);
        });

      });
    });
  }
  // 分页查询
  findFormPage(collectionName, condition, inputConfig) {
    const config = {
      pageIndex: 1,
      pageSize: 20,
      sortKey: '_id',
      sortType: 1,
      ...inputConfig
    };

    const skipNum = config.pageSize * (config.pageIndex - 1);

    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        const result = db
          .collection(collectionName)
          .find(condition)
          .sort({ [config.sortKey]: config.sortType })
          .skip(skipNum)
          .limit(config.pageSize);

        result.toArray(function (err, doc) {
          if (err) {
            reject(err);
            return;
          }
          resolve(doc);
        });

      });
    });
  }
  // 更新方法
  update(collectionName, oldJson, newJson) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName).updateOne(oldJson, {
          $set: newJson
        }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });
  }
  // 插入数据
  insert(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName).insertOne(json, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });
  }
  // 删除数据
  remove(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName).removeOne(json, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });
  }
  // mongodb里面查询_id需要把字符串转换成对象
  getObjectId(id) {
    return new ObjectID(id);
  }
}


module.exports = DB.getInstance();
