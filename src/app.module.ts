import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { setEnvironment } from './infrastructure/configuration';
import { TypeOrmConfigService } from './infrastructure/database/config/typeormConfig.service';
import { LoggerModule } from 'nestjs-pino';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { PresentationModule } from './presentation/presentation.module';
import { randomUUID } from 'node:crypto';
import pino from 'pino';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: setEnvironment(),
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    LoggerModule.forRoot({
      pinoHttp: {
        stream: pino.destination({
          dest: './logs',
          minLength: 4096,
          sync: false,
        }),
        genReqId: function (req, res) {
          const existingID = req.id ?? req.headers['x-request-id'];
          if (existingID) return existingID;
          const id = randomUUID();
          res.setHeader('X-Request-Id', id);
          return id;
        },
        customLogLevel(req, res, error) {
          if (res.statusCode >= 400 && res.statusCode < 500) {
            return 'warn';
          } else if (res.statusCode >= 500 || error) {
            return 'error';
          } else if (res.statusCode >= 300 && res.statusCode < 400) {
            return 'silent';
          }
          return 'info';
        },
      },
    }),
    ApplicationModule,
    InfrastructureModule,
    PresentationModule,
  ],
  providers: [],
})
export class AppModule {}
