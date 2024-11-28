import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../../decorators/api-public.decorator';

@ApiTags('Health Check')
@Controller('health')
export class HealthCheckController {
  @Public()
  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'The service is healthy.' })
  @ApiResponse({ status: 500, description: 'The service is not healthy.' })
  healthCheck(): string {
    return 'OK';
  }
}
