import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): object {
    return { msg: 'Health check status-->200::OK' };
  }
}
