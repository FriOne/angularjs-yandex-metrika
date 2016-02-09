function MetrikaProvider() {
  var counterConfig = {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: false,
    trackHash: true,
    ut: 'noindex'
  };
  var oauthToken;
  return {
    configureCounter: function (config) {
      counterConfig = angular.extend(config, newConfig);
    },
    $get: function() {
      return {
        counterConfig: counterConfig,
        oauthToken: oauthToken
      };
    }
  };
}

function MetrikaPrototype() {
  var self = this;
  self.fireEvent = function(type) {
    console.warn('[' + type + '] You should provide counter id to use Yandex metrika events');
  };
}

function Metrika() {
  var self = this;
  if (!self.counterConfig.id) {
    console.warn('You should provide counter id to use Yandex metrika counter');
    return;
  }
  self.counterName = 'yaCounter' + self.counterConfig.id;
  self.fireEvent = fireEvent;
  insertMetrika();

  function insertMetrika() {
    var name = 'yandex_metrika_callbacks';
    window[name] = window[name] || [];
    window[name].push(function() {
      try {
        window[self.counterName] = new Ya.Metrika(self.counterConfig);
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
    window[self.counterName].reachGoal(type);
  }
}
Metrika.prototype = MetrikaPrototype;

var module = angular.module('yandex-metrika', []);
module.provider('metrika', MetrikaProvider);
module.service('metrika', Metrika);
