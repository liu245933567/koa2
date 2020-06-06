import * as mysql from 'mysql';
import { Pool } from 'mysql';
import conf from '../config';

class DB {
  pool: Pool;
  constructor() {
    this.pool = mysql.createPool(conf.mysql);
    this.getConnection = this.getConnection.bind(this);
  }

  getConnection(sql: string) {
    return new Promise((resolve: (result: any[]) => void, reject) => {
      this.pool.getConnection((error, connection) => {
        if (error) {
          reject(error);
        } else {
          connection.query(sql, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
            // 释放连接
            connection.release();
          });
        }
      });
    });
  }
}

export default DB;
