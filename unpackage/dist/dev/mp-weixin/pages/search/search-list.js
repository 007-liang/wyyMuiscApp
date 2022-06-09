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
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u6587\u6863/\u8BFE\u7A0B/\u5C0F\u7A0B\u5E8F/cloudmusic/pages/search/search-list.vue"]]);
wx.createComponent(Component);
