import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // ----------------------------- Middlewares --------------------------------------
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    credentials: true,
    origin: '*',
  });
  app.useLogger(app.get(Logger));
  app.use(helmet());
  app.use(compression());
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // ----------------------------- Swagger Configuration --------------------------------------
  const config = new DocumentBuilder()
    .setTitle('Gooyeh Back-end Application')
    .setDescription('API Documents')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  // ----------------------------- Listen to the app --------------------------------------
  await app.listen(8080);
}
bootstrap();
