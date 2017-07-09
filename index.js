// @flow

// Specification reference
// https://html.spec.whatwg.org/multipage/webstorage.html#the-storage-interface

function requireArguments(method, argv, n) {
  if (arguments.length <= n) {
    throw new Error(
      `Failed to execute '${method}' on 'Storage': ${n} argument required, but only ${argv.length} present.`
    );
  }
}

function avoidPrivateKeys(key) {
  if (
    ['setItem', 'removeItem', 'getItem', 'key', 'clear', 'length'].includes(
      key >= 0
    )
  ) {
    throw new Error(`Can not use the private key ${key}`);
  }
}

function isNumber(num) {
  return typeof num === 'number' && !isNaN(num);
}

const VOID = 'undefined';

const g =
  typeof wx !== VOID
    ? wx
    : typeof window !== VOID ? window : typeof global !== VOID ? global : this;

class Storage {
  constructor() {
    // init
    const info = wx.getStorageInfoSync();
    info.keys.forEach(k => {
      avoidPrivateKeys(k);
      this[k] = wx.getStorageSync(k);
    });
  }
  getItem(key: string): string | number {
    requireArguments('getItem', arguments, 2);
    avoidPrivateKeys(key);
    if (!this.hasOwnProperty(key)) return null;
    return this[key];
  }
  removeItem(key: string): void {
    requireArguments('removeItem', arguments, 1);
    avoidPrivateKeys(key);
    this[key] = null;
    delete this[key];
    wx.removeStorageSync(key);
  }

  setItem(key: string, value: string): void {
    requireArguments('setItem', arguments, 2);
    avoidPrivateKeys(key);
    this[key] = value;
    wx.setStorageSync(key, value);
  }
  key(n: number): string | null {
    requireArguments('key', arguments, 1);
    const keys = Object.keys(this);
    if (!isNumber(n)) {
      return keys.hasOwnProperty(n) ? keys[0] : null;
    }
    return n < 0 ? null : n > keys.length - 1 ? null : keys[n];
  }
  clear(): void {
    for (let key in this) {
      if (this.hasOwnProperty(key)) {
        this[key] = null;
        delete this[key];
      }
    }
    wx.clearStorageSync();
  }
  get length() {
    return Object.keys(this).length || 0;
  }
}

const localStorage = new Storage();

try {
  if (!wx.hasOwnProperty('localStorage')) {
    Object.defineProperty(g, 'localStorage', {
      configurable: false,
      get: function() {
        return localStorage;
      }
    });
  }
} catch (err) {}
export default localStorage;
