import { Controller, Get } from '@nestjs/common';

import { SuccessResponse } from '../common/responses/success.response';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return SuccessResponse({
      message: 'Health check successful.',
      data: {
        service: 'Forge Auth Service',
      },
    });
  }
}