"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_localstorage = require("../../utils/localstorage.js");
var utils_symbols = require("../../utils/symbols.js");
require("../../utils/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const history = common_vendor.ref(utils_localstorage.getLocalStorage(utils_symbols.search_history_localstorage) || [
      "So Far Away",
      "\u5B64\u52C7\u8005",
      "\u53CD\u65B9\u5411\u7684\u949F",
      "C"
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(history), (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: item,
            c: common_vendor.o(($event) => _ctx.clickHistoryTag(item))
          };
        }),
        b: common_vendor.unref(history).length > 0
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u6587\u6863/\u8BFE\u7A0B/\u5C0F\u7A0B\u5E8F/cloudmusic/pages/search/history.vue"]]);
wx.createComponent(Component);
