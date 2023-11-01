import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserUseCases } from 'src/application/use-cases/userUseCases';

@ApiTags('User')
@ApiBearerAuth()
@Controller({ version: '1', path: 'user' })
export class UserController {
  constructor(private userUseCases: UserUseCases) {}
  @Get('getUser')
  getUser() {
    return this.userUseCases.getUser();
  }
}
