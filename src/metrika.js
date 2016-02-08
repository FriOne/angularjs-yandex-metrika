function MetrikaProvider() {
  var config = {};
  return {
    configure: function (newConfig) {
      config = angular.extend(config, newConfig);
    },
    $get: function() {
      return {
        config: config
      };
    }
  };
}

function MetrikaPrototype() {

}

function Metrika() {
  'ngInject';

  var self = this;

  if (!self.config.id) {
    console.warn('You should provide id for Yandex Metrika');
    return;
  }
}
Metrika.prototype = MetrikaPrototype;

var module = angular.module('yandex-metrika', []);
module.provider('metrika', MetrikaProvider);
module.service('metrika', Metrika);
