"use strict";
var common_vendor = require("../../../common/vendor.js");
require("../../../store/audio.js");
<<<<<<< HEAD
require("../../../store/playing-song.js");
var store_storeSearch = require("../../../store/store-search.js");
require("../../../store/store-user-info.js");
require("../../../store/history-library.js");
require("../../../store/store-music-library.js");
require("../../../store/playing-song-library.js");
=======
require("../../../store/playingSong.js");
var store_storeSearch = require("../../../store/store-search.js");
require("../../../store/store-user-info.js");
require("../../../store/store-music-library.js");
>>>>>>> 1a0ac77e42b6c066ca79ac2e572eb36f2e909e1d
var utils_index = require("../../../utils/index.js");
var utils_navigateTo = require("../../../utils/navigateTo.js");
require("../../../utils/localstorage.js");
require("../../../utils/symbols.js");
require("../../../utils/request.js");
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
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u6587\u6863/\u8BFE\u7A0B/\u5C0F\u7A0B\u5E8F/cloudmusic/pages/search/search-detail/songlist.vue"]]);
wx.createComponent(Component);
