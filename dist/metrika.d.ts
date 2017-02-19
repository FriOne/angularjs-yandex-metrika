declare module "metrika" {
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
  export class MetrikaBase {
    fireEvent(type: string): void;
    hit(url: string, options: HitOptions): void;
  }
  export class Metrika extends MetrikaBase {
    static counterConfig: YandexCounterConfig;
    static insertMetrika(): string;
    static readonly counterName: string;
    fireEvent(type: string): void;
    hit(url: string, options: HitOptions): void;
  }
  export class MetrikaProvider implements ng.IServiceProvider {
    configureCounter(config: YandexCounterConfig): void;
    $get(): () => Metrika;
  }
}
