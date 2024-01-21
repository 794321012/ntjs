export default {
  SERVICE_CONFIG: {
    port: 3000,
    uploadStaticSrc: 'upload',
  },

  DATABASE_CONFIG: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '11111111',
    database: 'test',
    entities: ['dist/modules/**/*.entity{.ts,.js}'],
    synchronize: true,
    charset: 'utf8mb4',
    logging: false,
  },

  // Jwt配置
  JWT_CONFIG: {
    secret: 'wqeqwewe',
    signOptions: {
      expiresIn: 24, //token 时效
    },
  },
};
