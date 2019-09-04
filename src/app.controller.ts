import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller({ path: '/' })
export class AppController {
  @ApiExcludeEndpoint()
  @Get()
  root(): string {
    return 'Hello World!';
  }
}
