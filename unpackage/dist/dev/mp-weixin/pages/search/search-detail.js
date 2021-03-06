"use strict";
var common_vendor = require("../../common/vendor.js");
require("../../store/audio.js");
require("../../store/playing-song.js");
var store_storeSearch = require("../../store/store-search.js");
require("../../store/store-user-info.js");
require("../../store/history-library.js");
require("../../store/like-music-library.js");
require("../../store/store-music-library.js");
require("../../store/playing-song-library.js");
require("../../utils/index.js");
require("../../utils/request.js");
require("../../utils/play-strategy.js");
require("../../api/getSong.js");
require("../../utils/localstorage.js");
require("../../utils/symbols.js");
if (!Array) {
  const _easycom_loading2 = common_vendor.resolveComponent("loading");
  _easycom_loading2();
}
const _easycom_loading = () => "../../components/loading/loading.js";
if (!Math) {
  (_easycom_loading + Songs + Songlist)();
}
const Songlist = () => "./search-detail/songlist.js";
const Songs = () => "./search-detail/songs.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const search_store = store_storeSearch.useSearchStore();
    const lazy_comps = common_vendor.reactive({});
    common_vendor.onMounted(() => {
      common_vendor.effect(() => {
        let current_search_comp = lazy_comps[search_store.active_search_nav.type];
        if (current_search_comp && !search_store.search_nav_data[search_store.active_search_nav.type]) {
          current_search_comp.load && current_search_comp.load();
        }
      });
    });
    const set_lazy_comp = (index) => {
      return (el) => {
        if (lazy_comps[index] == null) {
          lazy_comps[index] = el;
        }
      };
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(search_store).search_nav, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: index === common_vendor.unref(search_store).active_search_index ? 1 : "",
            c: item.title,
            d: common_vendor.o(($event) => common_vendor.unref(search_store).change_active_search_nav(index), item.title)
          };
        }),
        b: common_vendor.unref(search_store).loading,
        c: common_vendor.p({
          styles: "padding: 100rpx 0;"
        }),
        d: common_vendor.unref(search_store).search_nav_enum.song === common_vendor.unref(search_store).active_search_nav.type
      }, common_vendor.unref(search_store).search_nav_enum.song === common_vendor.unref(search_store).active_search_nav.type ? {
        e: common_vendor.sr(set_lazy_comp(common_vendor.unref(search_store).search_nav_enum.song), "4bf783ce-1"),
        f: set_lazy_comp(common_vendor.unref(search_store).search_nav_enum.song)
      } : {}, {
        g: common_vendor.unref(search_store).search_nav_enum.songlist === common_vendor.unref(search_store).active_search_nav.type
      }, common_vendor.unref(search_store).search_nav_enum.songlist === common_vendor.unref(search_store).active_search_nav.type ? {
        h: common_vendor.sr(set_lazy_comp(common_vendor.unref(search_store).search_nav_enum.songlist), "4bf783ce-2"),
        i: set_lazy_comp(common_vendor.unref(search_store).search_nav_enum.songlist)
      } : {}, {
        j: !common_vendor.unref(search_store).loading
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/\u6848\u4F8B/\u5C0F\u7A0B\u5E8F/\u7F51\u6613\u4E91\u97F3\u4E50/wyyMusic/pages/search/search-detail.vue"]]);
wx.createComponent(Component);
