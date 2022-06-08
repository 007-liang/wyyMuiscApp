"use strict";
var common_vendor = require("../../../common/vendor.js");
require("../../../store/audio.js");
require("../../../store/playingSong.js");
var store_storeSearch = require("../../../store/store-search.js");
require("../../../store/store-user-info.js");
require("../../../store/store-music-library.js");
require("../../../utils/localstorage.js");
require("../../../utils/symbols.js");
require("../../../utils/request.js");
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
            d: item.id
          };
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u6587\u6863/\u8BFE\u7A0B/\u5C0F\u7A0B\u5E8F/cloudmusic/pages/search/search-detail/songs.vue"]]);
wx.createComponent(Component);
