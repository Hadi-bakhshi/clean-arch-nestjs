import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './presentation/filters/allExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const httpAdapterHost = app.get(HttpAdapterHost);
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
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
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
