"use strict";
var utils_localstorage = require("../../utils/localstorage.js");
var utils_symbols = require("../../utils/symbols.js");
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    let history = utils_localstorage.getLocalStorage(utils_symbols.search_history_localstorage) || [
      "So Far Away",
      "A",
      "B",
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
        a: common_vendor.t(item)
      };
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u6587\u6863/\u8BFE\u7A0B/\u5C0F\u7A0B\u5E8F/cloudmusic/pages/search/history.vue"]]);
wx.createComponent(Component);
