import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { configureSwagger } from './configure-swagger.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
  type: VersioningType.URI,
  defaultVersion: '1',
});
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  )
  configureSwagger(app);
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
}
await bootstrap();
