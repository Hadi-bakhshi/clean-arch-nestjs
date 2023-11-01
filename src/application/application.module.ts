import { Module } from '@nestjs/common';
import { UserUseCases } from './use-cases/userUseCases';

@Module({
  controllers: [],
  providers: [UserUseCases],
  exports: [UserUseCases],
})
export class ApplicationModule {}
