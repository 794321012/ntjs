import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'; // 全局管道
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExecptionFilter } from './filter/http-execption.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()); //全局管道

  app.useGlobalInterceptors(new TransformInterceptor()); //全局拦截器

  app.useGlobalFilters(new HttpExecptionFilter()); //全局过滤器
  await app.listen(7001);
}
bootstrap();
