declare module "metrika"
{


	/// <reference types="angular" />
	export class MetrikaProvider implements ng.IServiceProvider {
	    counterConfigs: YandexCounterConfig[];
	    defaultCounterId: number | string;
	    configureCounter(configs: YandexCounterConfig | YandexCounterConfig[], defaultCounter?: number | string): void;
	    $get: (string | (($q: angular.IQService) => Metrika))[];
	}



	/// <reference types="angular" />
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
	    $q: ng.IQService;
	    counterConfigs: YandexCounterConfig[];
	    defaultCounterId: number | string;
	    static getCounterNameById(id: any): string;
	    static getCounterById(id: any): any;
	    static createCounter(config: YandexCounterConfig): void;
	    private positionToId;
	    constructor($q: ng.IQService, counterConfigs: YandexCounterConfig[], defaultCounterId: number | string);
	    insertMetrika(): string;
	    addFileExtension(extensions: string | string[], counterPosition?: number): void;
	    extLink(url: string, options?: CommonOptions, counterPosition?: number): ng.IPromise<any>;
	    file(url: string, options?: HitOptions, counterPosition?: number): ng.IPromise<any>;
	    getClientID(counterPosition?: number): string;
	    setUserID(userId: string, counterPosition?: number): void;
	    userParams(params: any, counterPosition?: number): void;
	    params(params: any, counterPosition?: number): void;
	    replacePhones(counterPosition?: number): void;
	    notBounce(options?: CallbackOptions, counterPosition?: number): ng.IPromise<any>;
	    fireEvent(type: string, options?: CommonOptions, counterPosition?: number): ng.IPromise<any>;
	    hit(url: string, options?: HitOptions, counterPosition?: number): ng.IPromise<any>;
	    private getCallbackPromise(options, resolveWith);
	    private counterIsLoaded(counterPosition?);
	    private getCounterByPosition(counterPosition?);
	    private getCounterIdByPosition(counterPosition);
	}

}