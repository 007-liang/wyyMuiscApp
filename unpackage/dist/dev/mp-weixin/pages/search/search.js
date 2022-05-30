"use strict";
var common_vendor = require("../../common/vendor.js");
var store_storeSearch = require("../../store/store-search.js");
require("../../utils/localstorage.js");
require("../../utils/symbols.js");
require("../../utils/request.js");
if (!Math) {
  (history + hot + music + hotSings)();
}
const history = () => "./history.js";
const hot = () => "./hot.js";
const music = () => "./music.js";
const hotSings = () => "./hot-sings.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const searchStore = store_storeSearch.useSearchStore();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(searchStore).search_keyword,
        b: common_vendor.o(($event) => common_vendor.unref(searchStore).search_keyword = $event.detail.value)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4cedc0c6"], ["__file", "G:/\u6848\u4F8B/\u5C0F\u7A0B\u5E8F/\u7F51\u6613\u4E91\u97F3\u4E50/wyyMusic/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
