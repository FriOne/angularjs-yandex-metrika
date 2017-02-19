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
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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

var ya_1 = __webpack_require__(3);
var DEFAULT_CONFIG = {
    id: null,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: false,
    trackHash: true,
    ut: 'noindex'
};
var Metrika = (function () {
    function Metrika() {
    }
    Metrika.insertMetrika = function () {
        if (!Metrika.counterConfig.id) {
            console.warn('You should provide counter id to use Yandex metrika counter');
            return;
        }
        var name = 'yandex_metrika_callbacks';
        window[name] = window[name] || [];
        window[name].push(function () {
            try {
                window[Metrika.counterName] = new ya_1.ya.Metrika(Metrika.counterConfig);
            }
            catch (e) { }
        });
        var n = document.getElementsByTagName('script')[0], s = document.createElement('script'), f = function () { n.parentNode.insertBefore(s, n); };
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
    };
    Object.defineProperty(Metrika, "counterName", {
        get: function () {
            return 'yaCounter' + Metrika.counterConfig.id;
        },
        enumerable: true,
        configurable: true
    });
    Metrika.prototype.fireEvent = function (type) {
        if (!Metrika.counterConfig.id) {
            console.warn("'[" + type + "] You should provide counter id to use Yandex metrika events'");
            return;
        }
        if (window[Metrika.counterName] && window[Metrika.counterName].reachGoal) {
            window[Metrika.counterName].reachGoal(type);
        }
        else {
            console.warn("'Event with type [" + type + "] can't be fired because counter is still loading'");
        }
    };
    Metrika.prototype.hit = function (url, options) {
        if (!Metrika.counterConfig.id) {
            console.warn("'[" + url + "] You should provide counter id to use Yandex metrika events'");
            return;
        }
        if (window[Metrika.counterName] && window[Metrika.counterName].reachGoal) {
            window[Metrika.counterName].hit(url, options);
        }
        else {
            console.warn("'Hit for page [" + url + "] can't be fired because counter is still loading'");
        }
    };
    return Metrika;
}());
Metrika.counterConfig = DEFAULT_CONFIG;
exports.Metrika = Metrika;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/** @internal */
var angular_1 = __webpack_require__(0);
/** @internal */
var mertika_service_1 = __webpack_require__(1);
var MetrikaProvider = (function () {
    function MetrikaProvider() {
    }
    MetrikaProvider.prototype.configureCounter = function (config) {
        angular_1.ng.extend(mertika_service_1.Metrika.counterConfig, config);
    };
    MetrikaProvider.prototype.$get = function () {
        return function () { return new mertika_service_1.Metrika(); };
    };
    return MetrikaProvider;
}());
exports.MetrikaProvider = MetrikaProvider;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/** @internal */
exports.ya = Ya;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/** @internal */
var angular_1 = __webpack_require__(0);
/** @internal */
var mertika_provider_1 = __webpack_require__(2);
var mertika_service_1 = __webpack_require__(1);
var module = angular_1.ng.module('yandex-metrika', []);
module.provider('$metrika', mertika_provider_1.MetrikaProvider);
module.run(['$metrika', function () {
        mertika_service_1.Metrika.insertMetrika();
    }]);


/***/ })
/******/ ]);
});
//# sourceMappingURL=metrika.js.map