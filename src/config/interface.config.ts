export interface Config {
  // 服务端基本配置
  SERVICE_CONFIG: {
    port: number;
    //静态文件路劲 localhost:3000/static/upload/xxx.jpg
    uploadStaticSrc: string;
  };

  // 数据库基本配置
  DATABASE_CONFIG: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: string[];
    synchronize: boolean;
    charset: string;
    logging: boolean;
  };

  // Jwt配置
  JWT_CONFIG: {
    secret: string;
    signOptions: {
      expiresIn: string; //token 时效
    };
  };
}
