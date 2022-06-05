"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "paddingTop",
  data() {
    return {
      statusBarHight: 0
    };
  },
  created() {
    this.statusBarHight = common_vendor.index.getSystemInfoSync().statusBarHeight * 2;
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: `${$data.statusBarHight}rpx`
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u6587\u6863/\u8BFE\u7A0B/\u5C0F\u7A0B\u5E8F/cloudmusic/components/paddingTop/paddingTop.vue"]]);
wx.createComponent(Component);
