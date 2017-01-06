var counterConfig = {
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  webvisor: false,
  trackHash: true,
  ut: 'noindex'
};

function MetrikaPrototype() {
  var self = this;
  self.fireEvent = function(type) {
    console.warn('[' + type + '] You should provide counter id to use Yandex metrika events');
  };
  self.hit = function(url, options) {
    console.warn('[' + url + '] You should provide counter id to use Yandex metrika events');
  };
}

function Metrika() {
  var self = this;
  self.counterName = 'yaCounter' + counterConfig.id;
  self.$insertMetrika = insertMetrika;
  if (!counterConfig.id) {
    return;
  }
  self.fireEvent = fireEvent;
  self.hit = hit;

  function insertMetrika() {
    if (!counterConfig.id) {
      console.warn('You should provide counter id to use Yandex metrika counter');
      return;
    }
    var name = 'yandex_metrika_callbacks';
    window[name] = window[name] || [];
    window[name].push(function() {
      try {
        window[self.counterName] = new Ya.Metrika(counterConfig);
      } catch(e) {}
    });

    var n = document.getElementsByTagName('script')[0],
      s = document.createElement('script'),
      f = function () { n.parentNode.insertBefore(s, n); };
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'https://mc.yandex.ru/metrika/watch.js';

    if (window.opera == '[object Opera]') {
      document.addEventListener('DOMContentLoaded', f, false);
    } else {f();}
    return name
  }

  function fireEvent(type) {
    if (window[self.counterName] && window[self.counterName].reachGoal) {
      window[self.counterName].reachGoal(type);
    }
    else {
      console.warn('Event with type [' + type + '] can\'t be fired because counter is still loading');
    }
  }

  function hit(url, options) {
    if (window[self.counterName] && window[self.counterName].reachGoal) {
      window[self.counterName].hit(url, options);
    }
    else {
      console.warn('Hit for page [' + url + '] can\'t be fired because counter is still loading');
    }
  }
}
Metrika.prototype = MetrikaPrototype;

function MetrikaProvider() {
  return {
    configureCounter: function (config) {
      angular.extend(counterConfig, config);
    },
    $get: function metrikaFactory() {
      return new Metrika();
    }
  }
}

var module = angular.module('yandex-metrika', []);
module.provider('$metrika', MetrikaProvider);
module.run(['$metrika', function($metrika) {
  $metrika.$insertMetrika();
}]);
