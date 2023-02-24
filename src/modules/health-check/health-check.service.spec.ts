import { HealthCheckService } from './health-check.service';
import { TranslateService } from '../common/translate/translate.service';
import { testingModule } from '../../test.module';

describe('HealthCheckService', () => {
  let healthCheckService: HealthCheckService;
  let translateService: TranslateService;

  beforeEach(async () => {
    const { module, translate } = await testingModule({
      providers: [HealthCheckService],
    });

    healthCheckService = await module.resolve(HealthCheckService);
    translateService = translate;
  });
  describe('health check test "Estou vivo"', () => {
    it('should return ', async () => {
      expect(await healthCheckService.get()).toBe('Estou vivo');
    });

    it('when change language to en should return "I am live"', async () => {
      translateService.setLang('en');
      expect(await healthCheckService.get()).toBe('I am live');
    });
  });
});
