import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  healthCheck() {
    return this.health.check([
      async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
      async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
      () =>
        this.disk.checkStorage('disk health', {
          thresholdPercent: 0.5,
          path: '/',
        }),
      () =>
        this.disk.checkStorage('disk health', {
          threshold: 250 * 1024 * 1024 * 1024,
          path: '/',
        }),
    ]);
  }
}
