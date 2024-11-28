import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
    }).compile();
    controller = module.get<HealthCheckController>(HealthCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return "OK"', () => {
    expect(controller.healthCheck()).toBe('OK');
  });
});
