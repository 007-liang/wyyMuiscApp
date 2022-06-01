"use strict";
const getLocalStorage = (key) => {
  return wx.getStorageSync(key);
};
const setLocalStorage = (key, data) => {
  wx.setStorageSync(key, data);
};
exports.getLocalStorage = getLocalStorage;
exports.setLocalStorage = setLocalStorage;
