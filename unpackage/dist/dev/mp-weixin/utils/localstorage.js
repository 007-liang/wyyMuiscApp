"use strict";
const getLocalStorage = (key) => {
  return wx.getStorageSync(key);
};
exports.getLocalStorage = getLocalStorage;
