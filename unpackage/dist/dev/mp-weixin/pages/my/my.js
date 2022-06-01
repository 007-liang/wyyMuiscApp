"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  }
};
if (!Array) {
  const _easycom_paddingTop2 = common_vendor.resolveComponent("paddingTop");
  const _easycom_notLoginBar2 = common_vendor.resolveComponent("notLoginBar");
  (_easycom_paddingTop2 + _easycom_notLoginBar2)();
}
const _easycom_paddingTop = () => "../../components/paddingTop/paddingTop.js";
const _easycom_notLoginBar = () => "../../components/notLoginBar/notLoginBar.js";
if (!Math) {
  (_easycom_paddingTop + _easycom_notLoginBar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u6587\u6863/\u8BFE\u7A0B/\u5C0F\u7A0B\u5E8F/cloudmusic/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
