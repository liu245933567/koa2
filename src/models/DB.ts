import * as mysql from 'mysql';
import {Pool} from 'mysql';

class DB {
  pool: Pool;
  // connection: Promise<PoolConnection>;
  constructor() {
    this.pool = mysql.createPool({
      host: '127.0.0.1',
      user: 'root',
      password: 'liu199699',
      database: 'runoob',
      port: 3306
    });
    this.getConnection = this.getConnection.bind(this);
    // this.connection = this.getConnection();
  }

  getConnection(sql: string) {
    return new Promise((resolve: (result: any[]) => void, reject) => {
      this.pool.getConnection((error, connection) => {
        if (error) {
          console.log('数据库连接失败');
          reject(error);
        } else {
          console.log('数据库连接成功');
          connection.query(sql, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        }
        // 释放连接
        connection.release();
      });
    });
  }


}

export default DB;
