"use strict";
var common_vendor = require("../../common/vendor.js");
var store_storeSearch = require("../../store/store-search.js");
require("../../store/store-user-info.js");
require("../../utils/localstorage.js");
require("../../utils/symbols.js");
require("../../utils/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const searchStore = store_storeSearch.useSearchStore();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(searchStore).searchs, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.keyword),
            b: item.keyword,
            c: common_vendor.o(($event) => common_vendor.unref(searchStore).push_history(item.keyword), item.keyword)
          };
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/\u6848\u4F8B/\u5C0F\u7A0B\u5E8F/\u7F51\u6613\u4E91\u97F3\u4E50/wyyMusic/pages/search/search-list.vue"]]);
wx.createComponent(Component);
