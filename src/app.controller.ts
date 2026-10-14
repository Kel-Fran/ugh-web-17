import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async getHello() {
    return {
        cnt: await this.appService.paintingsCnt(),
        pnts: await this.appService.paintingsList()
    }
  }
}
