"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_side2 = common_vendor.resolveComponent("side");
  _easycom_side2();
}
const _easycom_side = () => "../../components/side/side.js";
if (!Math) {
  (_easycom_side + banner + category + newsSonglist + exclusiveBroadcast)();
}
const category = () => "./category.js";
const newsSonglist = () => "./news-songlist.js";
const banner = () => "./banner.js";
const exclusiveBroadcast = () => "./exclusive-broadcast.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const to_search_page = () => {
      wx.navigateTo({
        url: "/pages/search/search"
      });
    };
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(to_search_page)
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u6587\u6863/\u8BFE\u7A0B/\u5C0F\u7A0B\u5E8F/cloudmusic/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
