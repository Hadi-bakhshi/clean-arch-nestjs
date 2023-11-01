import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserUseCases {
  private readonly logger = new Logger(UserUseCases.name);
  constructor() {}

  getUser() {
    return 'ME';
  }
}
