// FILE: app.controller.ts
// _______________________________________________

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// _______________________________________________

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  getHello(): object {
    return this.appService.healthCheck();
  }
}
// _______________________________________________