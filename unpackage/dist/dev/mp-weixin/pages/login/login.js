"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_loginLogo2 = common_vendor.resolveComponent("loginLogo");
  const _easycom_phoneLogin2 = common_vendor.resolveComponent("phoneLogin");
  (_easycom_loginLogo2 + _easycom_phoneLogin2)();
}
const _easycom_loginLogo = () => "../../components/loginLogo/loginLogo.js";
const _easycom_phoneLogin = () => "../../components/phoneLogin/phoneLogin.js";
if (!Math) {
  (_easycom_loginLogo + _easycom_phoneLogin)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/\u6848\u4F8B/\u5C0F\u7A0B\u5E8F/\u7F51\u6613\u4E91\u97F3\u4E50/wyyMusic/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
