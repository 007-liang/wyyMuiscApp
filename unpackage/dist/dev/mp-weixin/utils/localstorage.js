"use strict";
function getLocalStorage(key, is_parser = true) {
  return wx.getStorageSync(key);
}
exports.getLocalStorage = getLocalStorage;
