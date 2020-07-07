/** 基本配置 */
export interface Base {
  /** 当前运行环境 */
  env: 'development' | 'production';
  /** 启动端口号 */
  port: number;
  /** mysql 数据库配置 */
  mysql: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
  /** mongoDB 数据库配置 */
  mongoDB: {
    host: string;
    username: string;
    password: string;
    database: string;
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
  };
  /** redis 配置 */
  redis: {
    host: string;
    port: number;
    password: string;
  },
  /** 静态资源路径 */
  staticPath: string;
}
