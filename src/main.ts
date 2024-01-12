import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'; // 全局管道
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExecptionFilter } from './filter/http-execption.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express'; // 使用 express 的useStaticAssets 功能
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe()); //全局管道

  app.useGlobalInterceptors(new TransformInterceptor()); //全局拦截器

  app.useGlobalFilters(new HttpExecptionFilter()); //全局过滤器

  app.useStaticAssets(join(__dirname, '..', 'upload'));

  const options = new DocumentBuilder() // swagger文档
    .setTitle('blog-serve')
    .setDescription('接口文档') //
    .setVersion('1.0') //
    .addBearerAuth() // 设置认证方式为Bearer
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(7001);
}
bootstrap();
