//index.js

require('../../index').default;

var app = getApp();
Page({
  data: {
    success: 0,
    fail: 0
  },
  set() {
    wx.localStorage.setItem('test', Math.random());
    this.setData({ test: wx.localStorage.test });
  },
  get() {
    wx.showModal({
      title: 'Current Value',
      content: wx.localStorage.getItem('test') + ''
    });
  },
  remove() {
    wx.localStorage.removeItem('test');
    console.log(wx.localStorage.test);
    this.setData({ test: wx.localStorage.test || 'null' });
  },
  clear() {
    wx.localStorage.clear();
    this.setData({ test: wx.localStorage.test || 'null' });
  },
  onLoad: function() {
    this.set();
    wx.localStorage.setItem('test', Math.random());
    console.log(wx.localStorage);
  }
});
