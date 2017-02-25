/** @internal */
import { ng as angular } from './angular';

/** @internal */
import { Metrika, YandexCounterConfig } from './mertika.service';

const DEFAULT_CONFIG = {
  id: null,
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  webvisor: false,
  trackHash: true,
  ut: 'noindex'
};

export class MetrikaProvider implements ng.IServiceProvider {
  counterConfigs: YandexCounterConfig[] = [];
  defaultCounterId: number | string;

  configureCounter(configs: YandexCounterConfig | YandexCounterConfig[], defaultCounter?: number | string) {
    if (!Array.isArray(configs)) {
      configs = [configs];
    }

    if (!defaultCounter) {
      this.defaultCounterId = configs[0].id;
    }
    else if (typeof defaultCounter === 'number' && defaultCounter < configs.length) {
      this.defaultCounterId = configs[defaultCounter].id;
    }
    else {
      this.defaultCounterId = defaultCounter;
    }

    if (!this.defaultCounterId) {
      console.warn('You provided wrong counter id as a default:', defaultCounter);
      return;
    }

    let defaultCounterExists = false;
    let config;
    for (let i = 0; i < configs.length; i++) {
      config = configs[i];
      if (!config.id) {
        console.warn('You should provide counter id to use Yandex metrika counter', config);
        continue;
      }
      if (config.id === this.defaultCounterId) {
        defaultCounterExists = true;
      }
      this.counterConfigs.push(angular.extend({}, DEFAULT_CONFIG, config));
    }

    if (!defaultCounterExists) {
      console.warn('You provided wrong counter id as a default:', defaultCounter);
    }
  }

  $get(): any {
    return ['$q', ($q: ng.IQService) => new Metrika($q, this.counterConfigs, this.defaultCounterId)];
  }
}
