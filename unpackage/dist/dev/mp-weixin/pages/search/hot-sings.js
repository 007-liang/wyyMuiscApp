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
require("../../utils/play-strategy.js");
require("../../utils/index.js");
require("../../api/getSong.js");
require("../../utils/localstorage.js");
require("../../utils/symbols.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    let sings = common_vendor.ref([]);
    async function getData() {
      let res = await utils_request.wxRequest({
        url: "/top/artists",
        data: {
          offset: 0,
          limit: 10
        }
      });
      sings.value = res.data.artists;
    }
    getData();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(sings), (item, k0, i0) => {
          return {
            a: item.picUrl + "?param=80y80",
            b: common_vendor.t(item.name),
            c: item.name
          };
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/\u6848\u4F8B/\u5C0F\u7A0B\u5E8F/\u7F51\u6613\u4E91\u97F3\u4E50/wyyMusic/pages/search/hot-sings.vue"]]);
wx.createComponent(Component);
