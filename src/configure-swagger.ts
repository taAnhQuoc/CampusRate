    import { INestApplication } from '@nestjs/common';
    import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

    export function configureSwagger(app: INestApplication): void {
      const config = new DocumentBuilder()
        .setTitle('CampusRate API')
        .setDescription(
          'API REST for campus places and rating them.',
        )
        .setVersion('1.0.0')
        .addTag('Place', 'Managing Place')
        .addTag('Review', 'Managing Rating')
        .build();

      const documentFactory = () =>
        SwaggerModule.createDocument(app, config);
        
      SwaggerModule.setup('v1/docs', app, documentFactory, {
        useGlobalPrefix: true,
        jsonDocumentUrl: 'v1/docs/openapi.json',
        customSiteTitle: 'CampusRate API - Documentation',
      });
    }