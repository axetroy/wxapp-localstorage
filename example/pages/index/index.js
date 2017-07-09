//index.js

require('../../index').default;

var app = getApp();
Page({
  data: {
    success: 0,
    fail: 0
  },
  onLoad: function() {
    wx.localStorage.setItem('random', Math.random());
    console.log(wx.localStorage);
  }
});
