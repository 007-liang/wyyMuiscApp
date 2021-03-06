"use strict";
var common_vendor = require("../../../common/vendor.js");
require("../../../store/audio.js");
require("../../../store/playing-song.js");
var store_storeSearch = require("../../../store/store-search.js");
require("../../../store/store-user-info.js");
require("../../../store/history-library.js");
require("../../../store/like-music-library.js");
require("../../../store/store-music-library.js");
require("../../../store/playing-song-library.js");
var utils_index = require("../../../utils/index.js");
var utils_navigateTo = require("../../../utils/navigateTo.js");
require("../../../utils/play-strategy.js");
require("../../../utils/request.js");
require("../../../api/getSong.js");
require("../../../utils/localstorage.js");
require("../../../utils/symbols.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props, { expose }) {
    const searchStore = store_storeSearch.useSearchStore();
    let load = false;
    expose({
      load() {
        if (load) {
          return;
        }
        load = true;
        searchStore.get_search_nav_data();
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(searchStore).cur_search_data, (item, k0, i0) => {
          return {
            a: item.coverImgUrl,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.trackCount),
            d: common_vendor.t(item.creator.nickname),
            e: common_vendor.t(common_vendor.unref(utils_index.transform_num_unit)(item.playCount)),
            f: item.id,
            g: common_vendor.o(($event) => common_vendor.unref(utils_navigateTo.to_music_library)(item.id), item.id)
          };
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/\u6848\u4F8B/\u5C0F\u7A0B\u5E8F/\u7F51\u6613\u4E91\u97F3\u4E50/wyyMusic/pages/search/search-detail/songlist.vue"]]);
wx.createComponent(Component);
