/** @internal */
import { ng as angular } from './angular';

/** @internal */
import { Metrika, YandexCounterConfig } from './mertika.service';

export class MetrikaProvider implements ng.IServiceProvider {
  configureCounter(config: YandexCounterConfig) {
    angular.extend(Metrika.counterConfig, config);
  }

  $get(): () => Metrika {
    return () => new Metrika();
  }
}
