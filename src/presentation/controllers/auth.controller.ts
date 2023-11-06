import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUseCases } from 'src/application/use-cases/authUseCases';
import { GetUser } from '../decorators/get-user';
import { RefreshJwtGuard } from '../guards/auth';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthUseCases) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login() {
    return this.authService.userPassLogin();
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@GetUser() user: any) {
    console.log('fd', user);

    return await this.authService.refreshToken(user);
  }
}
