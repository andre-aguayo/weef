import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheckService } from './health-check.service';
import routes from '../../config/routes';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller(routes.healthCheck.alias)
@ApiTags('health check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  @Roles(Role.PUBLIC)
  @ApiResponse({
    status: HttpStatus.OK,
    type: String,
  })
  async get(): Promise<string> {
    return this.healthCheckService.get();
  }
}
