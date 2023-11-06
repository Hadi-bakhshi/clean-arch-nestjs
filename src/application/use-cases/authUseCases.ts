import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthUseCases {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async userPassLogin() {
    return {
      accessToken: await this.signAccessToken({
        username: 'hadi',
        sub: { id: '25' },
      }),
      refreshToken: await this.signAccessToken({
        username: 'hadi',
        sub: { id: '25' },
      }),
    };
  }
  async refreshToken(user: any) {
    return {
      accessToken: await this.signAccessToken(user),
    };
  }
  async signAccessToken(payload: {
    username: string;
    sub: { id: string };
  }): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: '1m',
      secret: this.config.get('JWT_SECRET'),
      algorithm: 'RS256',
    });
  }
  async signRefreshToken(payload: {
    username: string;
    sub: { id: string };
  }): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.config.get('JWT_SECRET'),
      algorithm: 'RS256',
    });
  }
}
