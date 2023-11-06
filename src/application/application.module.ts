import { Module } from '@nestjs/common';
import { UserUseCases } from './use-cases/userUseCases';
import { AuthUseCases } from './use-cases/authUseCases';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [UserUseCases, AuthUseCases],
  exports: [UserUseCases, AuthUseCases],
})
export class ApplicationModule {}
