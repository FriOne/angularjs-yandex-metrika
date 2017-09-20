(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define("metrika", ["angular"], factory);
	else if(typeof exports === 'object')
		exports["metrika"] = factory(require("angular"));
	else
		root["metrika"] = factory(root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ng_from_import = __webpack_require__(4);
var ng_from_global = angular;
/** @internal */
exports.ng = (ng_from_import && ng_from_import.module) ? ng_from_import : ng_from_global;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/** @internal */
var angular_1 = __webpack_require__(0);
/** @internal */
var mertika_service_1 = __webpack_require__(3);
var DEFAULT_CONFIG = {
    id: null,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: false,
    trackHash: true,
    ut: 'noindex'
};
var MetrikaProvider = (function () {
    function MetrikaProvider() {
        var _this = this;
        this.counterConfigs = [];
        this.$get = ['$q', function ($q) { return new mertika_service_1.Metrika($q, _this.counterConfigs, _this.defaultCounterId); }];
    }
    MetrikaProvider.prototype.configureCounter = function (configs, defaultCounter) {
        if (!Array.isArray(configs)) {
            configs = [configs];
        }
        if (!defaultCounter) {
            this.defaultCounterId = configs[0].id;
        }
        else if (typeof defaultCounter === 'number' && defaultCounter < configs.length) {
            this.defaultCounterId = configs[defaultCounter].id;
        }
        else {
            this.defaultCounterId = defaultCounter;
        }
        if (!this.defaultCounterId) {
            console.warn('You provided wrong counter id as a default:', defaultCounter);
            return;
        }
        var defaultCounterExists = false;
        var config;
        for (var i = 0; i < configs.length; i++) {
            config = configs[i];
            if (!config.id) {
                console.warn('You should provide counter id to use Yandex metrika counter', config);
                continue;
            }
            if (config.id === this.defaultCounterId) {
                defaultCounterExists = true;
            }
            this.counterConfigs.push(angular_1.ng.extend({}, DEFAULT_CONFIG, config));
        }
        if (!defaultCounterExists) {
            console.warn('You provided wrong counter id as a default:', defaultCounter);
        }
    };
    return MetrikaProvider;
}());
exports.MetrikaProvider = MetrikaProvider;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/** @internal */
var angular_1 = __webpack_require__(0);
/** @internal */
var mertika_provider_1 = __webpack_require__(1);
var module = angular_1.ng.module('yandex-metrika', []);
module.provider('$metrika', mertika_provider_1.MetrikaProvider);
module.run(['$metrika', function ($metrika) {
        $metrika.insertMetrika();
    }]);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Metrika = (function () {
    function Metrika($q, counterConfigs, defaultCounterId) {
        this.$q = $q;
        this.counterConfigs = counterConfigs;
        this.defaultCounterId = defaultCounterId;
        this.positionToId = counterConfigs.map(function (config) { return config.id; });
    }
    Metrika.getCounterNameById = function (id) {
        return 'yaCounter' + id;
    };
    Metrika.getCounterById = function (id) {
        return window[Metrika.getCounterNameById(id)];
    };
    Metrika.createCounter = function (config) {
        window[Metrika.getCounterNameById(config.id)] = new Ya.Metrika(config);
    };
    Metrika.prototype.insertMetrika = function () {
        var _this = this;
        var name = 'yandex_metrika_callbacks';
        window[name] = window[name] || [];
        window[name].push(function () {
            try {
                _this.counterConfigs.map(function (config) { return Metrika.createCounter(config); });
            }
            catch (e) { }
        });
        var n = document.getElementsByTagName('script')[0], s = document.createElement('script'), f = function () { n.parentNode.insertBefore(s, n); };
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://mc.yandex.ru/metrika/watch.js';
        f();
        return name;
    };
    Metrika.prototype.addFileExtension = function (extensions, counterPosition) {
        this
            .counterIsLoaded(counterPosition)
            .then(function (counter) { return counter.addFileExtension(extensions); })
            .catch(function () { return console.warn('Counter is still loading'); });
    };
    Metrika.prototype.extLink = function (url, options, counterPosition) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return this
            .counterIsLoaded(counterPosition)
            .then(function (counter) {
            var promise = _this.getCallbackPromise(options, url);
            counter.extLink(url, options);
            return promise;
        })
            .catch(function () { return console.warn('Counter is still loading'); });
    };
    Metrika.prototype.file = function (url, options, counterPosition) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return this
            .counterIsLoaded(counterPosition)
            .then(function (counter) {
            var promise = _this.getCallbackPromise(options, url);
            counter.file(url, options);
            return promise;
        })
            .catch(function () { return console.warn('Counter is still loading'); });
    };
    Metrika.prototype.getClientID = function (counterPosition) {
        var counter = this.getCounterByPosition(counterPosition);
        if (counter && counter.reachGoal) {
            return counter.getClientID();
        }
        console.warn('Counter is still loading');
    };
    Metrika.prototype.setUserID = function (userId, counterPosition) {
        this
            .counterIsLoaded(counterPosition)
            .then(function (counter) { return counter.setUserID(userId); })
            .catch(function () { return console.warn('Counter is still loading'); });
    };
    Metrika.prototype.userParams = function (params, counterPosition) {
        this
            .counterIsLoaded(counterPosition)
            .then(function (counter) { return counter.userParams(params); })
            .catch(function () { return console.warn('Counter is still loading'); });
    };
    Metrika.prototype.params = function (params, counterPosition) {
        this
            .counterIsLoaded(counterPosition)
            .then(function (counter) { return counter.userParams(params); })
            .catch(function () { return console.warn('Counter is still loading'); });
    };
    Metrika.prototype.replacePhones = function (counterPosition) {
        this
            .counterIsLoaded(counterPosition)
            .then(function (counter) { return counter.replacePhones(); })
            .catch(function () { return console.warn('Counter is still loading'); });
    };
    Metrika.prototype.notBounce = function (options, counterPosition) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return this
            .counterIsLoaded(counterPosition)
            .then(function (counter) {
            var promise = _this.getCallbackPromise(options, options);
            counter.notBounce(options);
            return promise;
        })
            .catch(function () { return console.warn('Counter is still loading'); });
    };
    Metrika.prototype.fireEvent = function (type, options, counterPosition) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return this
            .counterIsLoaded(counterPosition)
            .then(function (counter) {
            var promise = _this.getCallbackPromise(options, type);
            counter.reachGoal(type, options.params, options.callback, options.ctx);
            return promise;
        })
            .catch(function () { return console.warn("'Event with type [" + type + "] can't be fired because counter is still loading'"); });
    };
    Metrika.prototype.hit = function (url, options, counterPosition) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return this
            .counterIsLoaded(counterPosition)
            .then(function (counter) {
            var promise = _this.getCallbackPromise(options, url);
            counter.hit(url, options);
            return promise;
        })
            .catch(function () { return console.warn("'Hit for page [" + url + "] can't be fired because counter is still loading'"); });
    };
    Metrika.prototype.getCallbackPromise = function (options, resolveWith) {
        var defer = this.$q.defer();
        var optionsCallback = options.callback;
        options.callback = function () {
            optionsCallback && optionsCallback.call(this);
            defer.resolve(resolveWith);
        };
        return defer.promise;
    };
    Metrika.prototype.counterIsLoaded = function (counterPosition) {
        var counter = this.getCounterByPosition(counterPosition);
        if (counter && counter.reachGoal) {
            return this.$q.resolve(counter);
        }
        return this.$q.reject(counter);
    };
    Metrika.prototype.getCounterByPosition = function (counterPosition) {
        var counterId = this.getCounterIdByPosition(counterPosition);
        return Metrika.getCounterById(counterId);
    };
    Metrika.prototype.getCounterIdByPosition = function (counterPosition) {
        return (counterPosition === undefined) ? this.defaultCounterId : this.positionToId[counterPosition];
    };
    return Metrika;
}());
exports.Metrika = Metrika;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=metrika.js.map