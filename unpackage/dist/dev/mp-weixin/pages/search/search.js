"use strict";
var common_vendor = require("../../common/vendor.js");
require("../../store/audio.js");
<<<<<<< HEAD
require("../../store/playing-song.js");
var store_storeSearch = require("../../store/store-search.js");
require("../../store/store-user-info.js");
require("../../store/history-library.js");
require("../../store/store-music-library.js");
require("../../store/playing-song-library.js");
require("../../utils/index.js");
require("../../utils/request.js");
=======
require("../../store/playingSong.js");
var store_storeSearch = require("../../store/store-search.js");
require("../../store/store-user-info.js");
require("../../store/store-music-library.js");
>>>>>>> 1a0ac77e42b6c066ca79ac2e572eb36f2e909e1d
require("../../utils/localstorage.js");
require("../../utils/symbols.js");
if (!Math) {
  (history + hot + music + hotSings + searchList + searchDetail)();
}
const history = () => "./history.js";
const hot = () => "./hot-search.js";
const music = () => "./music.js";
const hotSings = () => "./hot-sings.js";
const searchList = () => "./search-list.js";
const searchDetail = () => "./search-detail.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const searchStore = store_storeSearch.useSearchStore();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o((...args) => common_vendor.unref(searchStore).search_control_blur && common_vendor.unref(searchStore).search_control_blur(...args)),
        b: common_vendor.o((...args) => common_vendor.unref(searchStore).search_control_focus && common_vendor.unref(searchStore).search_control_focus(...args)),
        c: common_vendor.unref(searchStore).search_keyword,
        d: common_vendor.o(($event) => common_vendor.unref(searchStore).search_keyword = $event.detail.value),
        e: common_vendor.unref(searchStore).search_keyword.trim(),
        f: common_vendor.o((...args) => common_vendor.unref(searchStore).clear_keyword && common_vendor.unref(searchStore).clear_keyword(...args)),
        g: !common_vendor.unref(searchStore).search_keyword.trim(),
        h: common_vendor.unref(searchStore).search_control_focus_flag && common_vendor.unref(searchStore).search_keyword.trim(),
        i: common_vendor.unref(searchStore).search_keyword.trim() && !common_vendor.unref(searchStore).search_control_focus_flag
      }, common_vendor.unref(searchStore).search_keyword.trim() && !common_vendor.unref(searchStore).search_control_focus_flag ? {} : {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u6587\u6863/\u8BFE\u7A0B/\u5C0F\u7A0B\u5E8F/cloudmusic/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
