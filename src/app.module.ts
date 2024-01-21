import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from './modules/article/article.module';
import { UserModule } from './modules/user/user.module';
import { TagModule } from './modules/tag/tag.module';
import { PictureModule } from './modules/picture/picture.module';
import config from 'src/config/index';
console.log(config, '---===---');
// console.log(Config.DATABASE_CONFIG, '===');
// 当前环境
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '11111111',
      database: 'test',
      entities: ['dist/modules/**/*.entity{.ts,.js}'],
      synchronize: true,
      charset: 'utf8',
      logging: false,
    }),
    ArticleModule,
    UserModule,
    TagModule,
    PictureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
