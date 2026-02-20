import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppDataSource } from './database/data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await AppDataSource.initialize();
   app.enableCors({
    origin: ['http://localhost:3001', 'https://ton-domaine.com'], // ici les domaines autorisés
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  });

  const config = new DocumentBuilder()
    .setTitle('TypAnime API')
    .setDescription('API du jeu de typing sur les animés')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
