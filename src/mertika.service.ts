import { ya as Ya } from './ya';

export interface YandexCounterConfig {
  id: string | number;
  clickmap?: boolean;
  trackLinks?: boolean;
  accurateTrackBounce?: boolean;
  webvisor?: boolean;
  trackHash?: boolean;
  ut?: string;
}

export interface HitOptions {
  callback?: any;
  ctx?: any;
  params?: any;
  referer: string;
  title?: string;
}

const DEFAULT_CONFIG = {
  id: null,
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  webvisor: false,
  trackHash: true,
  ut: 'noindex'
};

export class Metrika {
  static counterConfig: YandexCounterConfig = DEFAULT_CONFIG;

  static insertMetrika() {
    if (!Metrika.counterConfig.id) {
      console.warn('You should provide counter id to use Yandex metrika counter');
      return;
    }
    let name = 'yandex_metrika_callbacks';
    window[name] = window[name] || [];
    window[name].push(function() {
      try {
        window[Metrika.counterName] = new Ya.Metrika(Metrika.counterConfig);
      } catch(e) {}
    });

    let n = document.getElementsByTagName('script')[0],
      s = document.createElement('script'),
      f = () => { n.parentNode.insertBefore(s, n); };
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'https://mc.yandex.ru/metrika/watch.js';

    if (typeof window['opera'] === '[object Opera]') {
      document.addEventListener('DOMContentLoaded', f, false);
    }
    else {
      f();
    }
    return name;
  }

  static get counterName() {
    return 'yaCounter' + Metrika.counterConfig.id;
  }

  fireEvent(type: string) {
    if (!Metrika.counterConfig.id) {
      console.warn(`'[${type}] You should provide counter id to use Yandex metrika events'`);
      return;
    }
    if (window[Metrika.counterName] && window[Metrika.counterName].reachGoal) {
      window[Metrika.counterName].reachGoal(type);
    }
    else {
      console.warn(`'Event with type [${type}] can\'t be fired because counter is still loading'`);
    }
  }

  hit(url: string, options: HitOptions) {
    if (!Metrika.counterConfig.id) {
      console.warn(`'[${url}] You should provide counter id to use Yandex metrika events'`);
      return;
    }
    if (window[Metrika.counterName] && window[Metrika.counterName].reachGoal) {
      window[Metrika.counterName].hit(url, options);
    }
    else {
      console.warn(`'Hit for page [${url}] can\'t be fired because counter is still loading'`);
    }
  }
}
