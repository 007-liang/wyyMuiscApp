"use strict";
var common_vendor = require("../../common/vendor.js");
require("../../store/audio.js");
require("../../store/playing-song.js");
require("../../store/store-search.js");
require("../../store/store-user-info.js");
require("../../store/history-library.js");
require("../../store/like-music-library.js");
require("../../store/store-music-library.js");
require("../../store/playing-song-library.js");
var utils_request = require("../../utils/request.js");
var utils_navigateTo = require("../../utils/navigateTo.js");
require("../../utils/play-strategy.js");
require("../../utils/index.js");
require("../../api/getSong.js");
require("../../utils/localstorage.js");
require("../../utils/symbols.js");
if (!Array) {
  const _easycom_songSheetCard2 = common_vendor.resolveComponent("songSheetCard");
  _easycom_songSheetCard2();
}
const _easycom_songSheetCard = () => "../../components/songSheetCard/songSheetCard.js";
if (!Math) {
  (Header + _easycom_songSheetCard)();
}
const Header = () => "./components/list-header.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    let new_songs = common_vendor.ref([]);
    const get_new_songs = async () => {
      let res = await utils_request.wxRequest({
        url: "/personalized",
        data: {
          limit: 6
        }
      });
      new_songs.value = res.data.result;
    };
    get_new_songs();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "\u63A8\u8350\u6B4C\u5355"
        }),
        b: common_vendor.f(common_vendor.unref(new_songs), (item, k0, i0) => {
          return {
            a: item.id,
            b: common_vendor.o(($event) => common_vendor.unref(utils_navigateTo.to_music_library)(item.id), item.id),
            c: "0d6c9761-1-" + i0,
            d: common_vendor.p({
              sid: item.id,
              picUrl: item.picUrl,
              playCount: item.playCount,
              name: item.name
            })
          };
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/\u6848\u4F8B/\u5C0F\u7A0B\u5E8F/\u7F51\u6613\u4E91\u97F3\u4E50/wyyMusic/pages/index/news-songlist.vue"]]);
wx.createComponent(Component);
