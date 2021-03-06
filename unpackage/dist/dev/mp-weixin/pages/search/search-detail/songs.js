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
require("../../../utils/request.js");
var utils_navigateTo = require("../../../utils/navigateTo.js");
require("../../../utils/play-strategy.js");
require("../../../utils/index.js");
require("../../../api/getSong.js");
require("../../../utils/localstorage.js");
require("../../../utils/symbols.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props, { expose }) {
    const searchStore = store_storeSearch.useSearchStore();
    const songs = common_vendor.computed$1(() => {
      return searchStore.search_nav_data[searchStore.active_search_nav.type] || [];
    });
    expose({
      load() {
        searchStore.get_search_nav_data();
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(songs), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.f(item.ar, (item2, k1, i1) => {
              return {
                a: common_vendor.t(item2.name),
                b: item2.id
              };
            }),
            c: common_vendor.t(item.al.name),
            d: item.id,
            e: common_vendor.o(($event) => common_vendor.unref(utils_navigateTo.to_song_detail)(item.id), item.id)
          };
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/\u6848\u4F8B/\u5C0F\u7A0B\u5E8F/\u7F51\u6613\u4E91\u97F3\u4E50/wyyMusic/pages/search/search-detail/songs.vue"]]);
wx.createComponent(Component);
