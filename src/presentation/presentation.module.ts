import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { ApplicationModule } from 'src/application/application.module';
import { HealthCheckController } from './controllers/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './controllers/auth.controller';
import { JWTStrategy, RefreshJwtStrategy } from './strategies';

@Module({
  imports: [ApplicationModule, TerminusModule, HttpModule],
  controllers: [UserController, HealthCheckController, AuthController],
  providers: [JWTStrategy, RefreshJwtStrategy],
})
export class PresentationModule {}
