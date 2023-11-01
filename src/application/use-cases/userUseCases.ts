import { BadRequestException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserUseCases {
  // private readonly logger = new Logger(UserUseCases.name);
  constructor() {}

  getUser() {
    throw new BadRequestException('Wrong Request');
    // throw new NotFoundException('چیزی یافت نشد');
    // return 'ME';
  }
}
