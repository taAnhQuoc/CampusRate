import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module.js';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { configureSwagger } from './config/configure-swagger.js';
import { configureHttp } from './config/configure-http.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  configureHttp(app);
  app.setGlobalPrefix('api');
  app.enableVersioning({
  type: VersioningType.URI,
  defaultVersion: '1',
});
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )
  configureSwagger(app);
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
}
await bootstrap();
