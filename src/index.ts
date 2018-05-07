/** @internal */
import { ng as angular } from './angular';

/** @internal */
import { MetrikaProvider } from './metrika.provider';
import { Metrika } from './metrika.service';

const module = angular.module('yandex-metrika', []);
module.provider('$metrika', MetrikaProvider);
module.run(['$metrika', ($metrika: Metrika) => {
  $metrika.insertMetrika();
}]);
