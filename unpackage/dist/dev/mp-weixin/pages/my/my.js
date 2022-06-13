"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_index = require("../../utils/index.js");
require("../../store/audio.js");
require("../../store/playing-song.js");
require("../../store/store-search.js");
var store_storeUserInfo = require("../../store/store-user-info.js");
require("../../store/history-library.js");
require("../../store/like-music-library.js");
require("../../store/store-music-library.js");
require("../../store/playing-song-library.js");
var api_songSheet = require("../../api/songSheet.js");
var utils_navigateTo = require("../../utils/navigateTo.js");
var utils_request = require("../../utils/request.js");
require("../../utils/play-strategy.js");
require("../../api/getSong.js");
require("../../utils/localstorage.js");
require("../../utils/symbols.js");
if (!Array) {
  const _easycom_songSheetCard2 = common_vendor.resolveComponent("songSheetCard");
  _easycom_songSheetCard2();
}
const _easycom_songSheetCard = () => "../../components/songSheetCard/songSheetCard.js";
if (!Math) {
  (Header + loginBar + notLoginBar + tags + myLikeMusic + _easycom_songSheetCard)();
}
const loginBar = () => "./loginBar.js";
const notLoginBar = () => "./notLoginBar.js";
const myLikeMusic = () => "./myLikeMusic.js";
const tags = () => "./tags.js";
const Header = () => "./header.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const songSheet = common_vendor.ref([]);
    const userInfo = store_storeUserInfo.useUserInfo().userInfo;
    const recommendSongList = async () => {
      const { data } = await utils_request.wxRequest({
        url: "/toplist/detail"
      });
      if (data.code === 200 && data.list) {
        utils_index.forEach(data.list, (data2) => {
          let { ToplistType } = data2;
          if (!ToplistType)
            return true;
          if (/^(N|H|)$/.test(ToplistType)) {
            songSheet.value.push(data2);
          }
        });
        recommendSongSheet();
      }
    };
    const recommendSongSheet = async () => {
      const { data } = await api_songSheet.getRecommendSongSheet();
      if (data.code === 200 && data.recommend) {
        songSheet.value.push(...data.recommend.slice(0, 4));
      }
    };
    recommendSongList();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(userInfo).login
      }, common_vendor.unref(userInfo).login ? {} : {}, {
        b: common_vendor.f(songSheet.value, (item, k0, i0) => {
          return {
            a: item.id,
            b: common_vendor.o(($event) => common_vendor.unref(utils_navigateTo.to_music_library)(item.id), item.id),
            c: "3c7f7bc0-5-" + i0,
            d: common_vendor.p({
              sid: item.id,
              name: item.name,
              picUrl: item.picUrl || item.coverImgUrl,
              playCount: item.playCount || item.playcount
            })
          };
        })
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/\u6848\u4F8B/\u5C0F\u7A0B\u5E8F/\u7F51\u6613\u4E91\u97F3\u4E50/wyyMusic/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
