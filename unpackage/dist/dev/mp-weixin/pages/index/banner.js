"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    common_vendor.ref([]);
    const get_banner = async () => {
      let res = await utils_request.wxRequest({
        url: "/banner"
      });
      console.log(res);
    };
    get_banner();
    return (_ctx, _cache) => {
      return {};
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u6587\u6863/\u8BFE\u7A0B/\u5C0F\u7A0B\u5E8F/cloudmusic/pages/index/banner.vue"]]);
wx.createComponent(Component);
