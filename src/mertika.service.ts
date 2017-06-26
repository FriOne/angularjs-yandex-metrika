export interface YandexCounterConfig {
  id: string | number;
  clickmap?: boolean;
  trackLinks?: boolean;
  accurateTrackBounce?: boolean;
  webvisor?: boolean;
  trackHash?: boolean;
  ut?: string;
}

export interface CallbackOptions {
  callback?: () => any;
  ctx?: any;
}

export interface CommonOptions extends CallbackOptions {
  params?: any;
  title?: any;
}

export interface HitOptions extends CommonOptions {
  referer?: string;
}

export class Metrika {

  static getCounterNameById(id) {
    return 'yaCounter' + id;
  }

  static getCounterById(id) {
    return window[Metrika.getCounterNameById(id)];
  }

  static createCounter(config: YandexCounterConfig) {
    window[Metrika.getCounterNameById(config.id)] = new Ya.Metrika(config);
  }

  private positionToId: any[];

  constructor(public $q: ng.IQService,
              public counterConfigs: YandexCounterConfig[],
              public defaultCounterId: number | string) {
    this.positionToId = counterConfigs.map(config => config.id);
  }

  insertMetrika() {
    let name = 'yandex_metrika_callbacks';
    window[name] = window[name] || [];
    window[name].push(() => {
      try {
        this.counterConfigs.map(config => Metrika.createCounter(config));
      } catch(e) {}
    });

    let n = document.getElementsByTagName('script')[0],
      s = document.createElement('script'),
      f = () => { n.parentNode.insertBefore(s, n); };
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'https://mc.yandex.ru/metrika/watch.js';

    f();
    return name;
  }

  addFileExtension(extensions: string | string[], counterPosition?: number) {
    this
      .counterIsLoaded(counterPosition)
      .then(counter => counter.addFileExtension(extensions))
      .catch(() => console.warn('Counter is still loading'));
  }

  extLink(url: string, options: CommonOptions = {}, counterPosition?: number): ng.IPromise<any> {
    return this
      .counterIsLoaded(counterPosition)
      .then(counter => {
        let promise = this.getCallbackPromise(options, url);
        counter.extLink(url, options);
        return promise;
      })
      .catch(() => console.warn('Counter is still loading'));
  }

  file(url: string, options: HitOptions = {}, counterPosition?: number): ng.IPromise<any> {
    return this
      .counterIsLoaded(counterPosition)
      .then(counter => {
        let promise = this.getCallbackPromise(options, url);
        counter.file(url, options);
        return promise;
      })
      .catch(() => console.warn('Counter is still loading'));
  }

  getClientID(counterPosition?: number): string {
    let counter = this.getCounterByPosition(counterPosition);
    if (counter && counter.reachGoal) {
      return counter.getClientID();
    }
    console.warn('Counter is still loading');
  }

  setUserID(userId: string, counterPosition?: number) {
    this
      .counterIsLoaded(counterPosition)
      .then(counter => counter.setUserID(userId))
      .catch(() => console.warn('Counter is still loading'));
  }

  userParams(params: any, counterPosition?: number) {
    this
      .counterIsLoaded(counterPosition)
      .then(counter => counter.userParams(params))
      .catch(() => console.warn('Counter is still loading'));
  }

  params(params: any, counterPosition?: number) {
    this
      .counterIsLoaded(counterPosition)
      .then(counter => counter.userParams(params))
      .catch(() => console.warn('Counter is still loading'));

  }

  replacePhones(counterPosition?: number) {
    this
      .counterIsLoaded(counterPosition)
      .then(counter => counter.replacePhones())
      .catch(() => console.warn('Counter is still loading'));
  }

  notBounce(options: CallbackOptions = {}, counterPosition?: number): ng.IPromise<any> {
    return this
      .counterIsLoaded(counterPosition)
      .then(counter => {
        let promise = this.getCallbackPromise(options, options);
        counter.notBounce(options);
        return promise;
      })
      .catch(() => console.warn('Counter is still loading'));
  }

  fireEvent(type: string, options: CommonOptions = {}, counterPosition?: number): ng.IPromise<any> {
    return this
      .counterIsLoaded(counterPosition)
      .then(counter => {
        let promise = this.getCallbackPromise(options, type);
        counter.reachGoal(type, options.params, options.callback, options.ctx);
        return promise;
      })
      .catch(() => console.warn(`'Event with type [${type}] can\'t be fired because counter is still loading'`));
  }

  hit(url: string, options: HitOptions = {}, counterPosition?: number): ng.IPromise<any> {
    return this
      .counterIsLoaded(counterPosition)
      .then(counter => {
        let promise = this.getCallbackPromise(options, url);
        counter.hit(url, options);
        return promise;
      })
      .catch(() => console.warn(`'Hit for page [${url}] can\'t be fired because counter is still loading'`));
  }

  private getCallbackPromise(options, resolveWith) {
    let defer = this.$q.defer();
    let optionsCallback = options.callback;
    options.callback = function() {
      optionsCallback && optionsCallback.call(this);
      defer.resolve(resolveWith);
    };
    return defer.promise;
  }

  private counterIsLoaded(counterPosition?: number): ng.IPromise<any> {
    let counter = this.getCounterByPosition(counterPosition);
    if (counter && counter.reachGoal) {
      this.$q.resolve(counter);
    }
    return this.$q.reject(counter);
  }

  private getCounterByPosition(counterPosition?: number) {
    let counterId = this.getCounterIdByPosition(counterPosition);
    return Metrika.getCounterById(counterId);
  }

  private getCounterIdByPosition(counterPosition: number) {
    return (counterPosition === undefined) ? this.defaultCounterId : this.positionToId[counterPosition];
  }
}
