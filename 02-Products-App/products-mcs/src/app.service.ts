import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): object {
    return { status: 'Ok-200', message: 'Server is running'};
  }
}
