/** @internal */
import { ng as angular } from './angular';

/** @internal */
import { MetrikaProvider } from './mertika.provider';
import { Metrika } from './mertika.service';

const module = angular.module('yandex-metrika', []);
module.provider('$metrika', MetrikaProvider);
module.run(['$metrika', () => {
  Metrika.insertMetrika();
}]);
