(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["wxLocalStorage"] = factory();
	else
		root["wxLocalStorage"] = factory();
})(this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Specification reference
// https://html.spec.whatwg.org/multipage/webstorage.html#the-storage-interface

function requireArguments(method, argv, n) {
  if (arguments.length <= n) {
    throw new Error('Failed to execute \'' + method + '\' on \'Storage\': ' + n + ' argument required, but only ' + argv.length + ' present.');
  }
}

function avoidPrivateKeys(key) {
  if (['setItem', 'removeItem', 'getItem', 'key', 'clear', 'length'].includes(key >= 0)) {
    throw new Error('Can not use the private key ' + key);
  }
}

function isNumber(num) {
  return typeof num === 'number' && !isNaN(num);
}

var VOID = 'undefined';

var g = (typeof wx === 'undefined' ? 'undefined' : _typeof(wx)) !== VOID ? wx : (typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== VOID ? window : (typeof global === 'undefined' ? 'undefined' : _typeof(global)) !== VOID ? global : this;

var Storage = function () {
  function Storage() {
    var _this = this;

    _classCallCheck(this, Storage);

    // init
    var info = wx.getStorageInfoSync();
    info.keys.forEach(function (k) {
      avoidPrivateKeys(k);
      _this[k] = wx.getStorageSync(k);
    });
  }

  _createClass(Storage, [{
    key: 'getItem',
    value: function getItem(key) {
      requireArguments('getItem', arguments, 2);
      avoidPrivateKeys(key);
      if (!this.hasOwnProperty(key)) return null;
      return this[key];
    }
  }, {
    key: 'removeItem',
    value: function removeItem(key) {
      requireArguments('removeItem', arguments, 1);
      avoidPrivateKeys(key);
      this[key] = null;
      delete this[key];
      wx.removeStorageSync(key);
    }
  }, {
    key: 'setItem',
    value: function setItem(key, value) {
      requireArguments('setItem', arguments, 2);
      avoidPrivateKeys(key);
      this[key] = value;
      wx.setStorageSync(key, value);
    }
  }, {
    key: 'key',
    value: function key(n) {
      requireArguments('key', arguments, 1);
      var keys = Object.keys(this);
      if (!isNumber(n)) {
        return keys.hasOwnProperty(n) ? keys[0] : null;
      }
      return n < 0 ? null : n > keys.length - 1 ? null : keys[n];
    }
  }, {
    key: 'clear',
    value: function clear() {
      for (var key in this) {
        if (this.hasOwnProperty(key)) {
          this[key] = null;
          delete this[key];
        }
      }
      wx.clearStorageSync();
    }
  }, {
    key: 'length',
    get: function get() {
      return Object.keys(this).length || 0;
    }
  }]);

  return Storage;
}();

var localStorage = new Storage();

try {
  if (!wx.hasOwnProperty('localStorage')) {
    Object.defineProperty(g, 'localStorage', {
      configurable: false,
      get: function get() {
        return localStorage;
      }
    });
  }
} catch (err) {}
/* harmony default export */ __webpack_exports__["default"] = (localStorage);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
});