import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(
    connectionName?: string | undefined,
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const dbHost = this.configService.get<string>('DB_HOST');
    const dbPort = this.configService.get<number>('DB_PORT', 1433);
    const dbUserName = this.configService.get<string>('DB_USERNAME');
    const dbPassword = this.configService.get<string>('DB_PASSWORD');
    const dbDatabase = this.configService.get<string>('DB_DATABASE');
    if (!dbDatabase || !dbHost || !dbPassword || !dbPort || !dbUserName) {
      throw new Error("Couldn't find the configuration to connect to db");
    }
    return {
      type: 'mssql',
      host: dbHost,
      port: Number(dbPort),
      username: dbUserName,
      password: dbPassword,
      database: dbDatabase,
      synchronize: false,
      // entities: [`${__dirname}/../../domain/entities/**/*.entity{.ts,.js}`],
      autoLoadEntities: true,
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    };
  }
}
