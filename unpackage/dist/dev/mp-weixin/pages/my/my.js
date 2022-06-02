"use strict";
var common_vendor = require("../../common/vendor.js");
require("../../store/store-search.js");
var store_storeUserInfo = require("../../store/store-user-info.js");
require("../../utils/localstorage.js");
require("../../utils/symbols.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_paddingTop2 = common_vendor.resolveComponent("paddingTop");
  const _easycom_loginBar2 = common_vendor.resolveComponent("loginBar");
  const _easycom_notLoginBar2 = common_vendor.resolveComponent("notLoginBar");
  const _easycom_myLikeMusic2 = common_vendor.resolveComponent("myLikeMusic");
  (_easycom_paddingTop2 + _easycom_loginBar2 + _easycom_notLoginBar2 + _easycom_myLikeMusic2)();
}
const _easycom_paddingTop = () => "../../components/paddingTop/paddingTop.js";
const _easycom_loginBar = () => "../../components/loginBar/loginBar.js";
const _easycom_notLoginBar = () => "../../components/notLoginBar/notLoginBar.js";
const _easycom_myLikeMusic = () => "../../components/myLikeMusic/myLikeMusic.js";
if (!Math) {
  (_easycom_paddingTop + _easycom_loginBar + _easycom_notLoginBar + _easycom_myLikeMusic)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const userInfo = store_storeUserInfo.useUserInfo().userInfo;
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(userInfo).login
      }, common_vendor.unref(userInfo).login ? {} : {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/\u6848\u4F8B/\u5C0F\u7A0B\u5E8F/\u7F51\u6613\u4E91\u97F3\u4E50/wyyMusic/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
