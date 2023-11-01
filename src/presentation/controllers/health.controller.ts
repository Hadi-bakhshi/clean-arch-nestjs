import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { timeout } from 'rxjs';

@ApiTags('Health Check')
@Controller('health')
export class HealthCheckController {
  constructor(
    private health: HealthCheckService,
    // private indicator: HealthIndicator,
    private db: TypeOrmHealthIndicator,
    private configService: ConfigService,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  healthCheck() {
    const host = this.configService.get<string>('HOST');
    const port = this.configService.get<string>('PORT');
    const urlApi = `http://${host}:${port}`;

    return this.health.check([
      () => this.http.pingCheck('URL', 'http://localhost:8080/doc'),
      async () => this.db.pingCheck('database', { timeout: 3000 }),
      async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
      async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
      //   () =>
      //     this.disk.checkStorage('disk health', {
      //       thresholdPercent: 0.5,
      //       path: '/',
      //     }),
    ]);
  }
}
