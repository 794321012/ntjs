import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'; // 全局管道
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExecptionFilter } from './filter/http-execption.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()); //全局管道

  app.useGlobalInterceptors(new TransformInterceptor()); //全局拦截器

  app.useGlobalFilters(new HttpExecptionFilter()); //全局过滤器
  const options = new DocumentBuilder()
    .setTitle('blog-serve')
    .setDescription('接口文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(7001);
}
bootstrap();
