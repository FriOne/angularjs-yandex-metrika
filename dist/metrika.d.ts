declare module "metrika"
{


	export interface YandexCounterConfig {
	    id: string | number;
	    clickmap?: boolean;
	    trackLinks?: boolean;
	    accurateTrackBounce?: boolean;
	    webvisor?: boolean;
	    trackHash?: boolean;
	    ut?: string;
	}
	export class Metrika {
	    static counterConfig: YandexCounterConfig;
	    static insertMetrika(): string;
	    static readonly counterName: string;
	    fireEvent(type: any): void;
	    hit(url: any, options: any): void;
	}

	export class MetrikaProvider implements ng.IServiceProvider {
	    configureCounter(config: YandexCounterConfig): void;
	    $get(): () => Metrika;
	}





}