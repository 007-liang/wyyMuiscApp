"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
<<<<<<< HEAD
require("../../store/audio.js");
require("../../store/playing-song.js");
require("../../store/store-search.js");
require("../../store/store-user-info.js");
require("../../store/history-library.js");
require("../../store/store-music-library.js");
require("../../store/playing-song-library.js");
require("../../utils/localstorage.js");
require("../../utils/symbols.js");
=======
var utils_navigateTo = require("../../utils/navigateTo.js");
>>>>>>> 1a0ac77e42b6c066ca79ac2e572eb36f2e909e1d
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
            c: "0c9857e8-1-" + i0,
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
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u6587\u6863/\u8BFE\u7A0B/\u5C0F\u7A0B\u5E8F/cloudmusic/pages/index/news-songlist.vue"]]);
wx.createComponent(Component);
