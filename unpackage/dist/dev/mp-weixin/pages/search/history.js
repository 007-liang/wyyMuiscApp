"use strict";
var utils_localstorage = require("../../utils/localstorage.js");
var utils_symbols = require("../../utils/symbols.js");
require("../../utils/request.js");
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    let history = utils_localstorage.getLocalStorage(utils_symbols.search_history_localstorage) || [
      "So Far Away",
      "\u5B64\u52C7\u8005",
      "\u53CD\u65B9\u5411\u7684\u949F",
      "C"
    ];
    return {
      history
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.history, (item, k0, i0) => {
      return {
        a: common_vendor.t(item),
        b: item
      };
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/\u6848\u4F8B/\u5C0F\u7A0B\u5E8F/\u7F51\u6613\u4E91\u97F3\u4E50/wyyMusic/pages/search/history.vue"]]);
wx.createComponent(Component);
