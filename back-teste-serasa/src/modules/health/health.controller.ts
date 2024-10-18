import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { HealthService } from './health.service';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('health')
@ApiTags('Health')
export class HealthController {
    constructor(private readonly healthService: HealthService) {}

    @Get('/readiness')
    @HealthCheck()
    async readiness(): Promise<HealthCheckResult> {
        return this.healthService.readiness();
    }

    @Get('/liveness')
    @HealthCheck()
    async liveness(): Promise<HealthCheckResult> {
        return this.healthService.liveness();
    }
}
