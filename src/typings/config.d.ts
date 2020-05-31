declare namespace CONF {
  export interface Base {
    env: string;
    port: number;
    mysql: {
      host: string;
      port: number;
      user: string;
      password: string;
      database: string;
    };
  }
}
