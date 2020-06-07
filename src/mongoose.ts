/**
 * 连接 MongoDB
 */

import * as mongoose from 'mongoose';
import config from './config';

const { mongoDB } = config;

// mongoose.Promise = Promise;
mongoose.set('useCreateIndex', true);

export default function connectDB() {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      `mongodb://${mongoDB.username}:${mongoDB.password}@${mongoDB.host}/${mongoDB.database}`,
      {
        useNewUrlParser: mongoDB.useNewUrlParser,
        useUnifiedTopology: mongoDB.useUnifiedTopology
      },
      async (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}
