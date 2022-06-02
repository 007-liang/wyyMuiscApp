"use strict";
var common_vendor = require("../../common/vendor.js");
var api_user = require("../../api/user.js");
require("../../utils/request.js");
require("../../store/store-search.js");
var store_storeUserInfo = require("../../store/store-user-info.js");
require("../../utils/localstorage.js");
require("../../utils/symbols.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const userStore = store_storeUserInfo.useUserInfo();
    const userInfo = userStore.userInfo;
    const userLv = userStore.userLv;
    const profile = userInfo.profile;
    const getUserLv = async () => {
      const { data } = await api_user.getUserLevel();
      if (data.code === 200 && data.data) {
        userStore.setUserLv(data.data);
      }
      return 0;
    };
    getUserLv();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(profile).defaultAvatar
      }, common_vendor.unref(profile).defaultAvatar ? {} : {
        b: common_vendor.unref(profile).avatarUrl + "?param=50y50"
      }, {
        c: common_vendor.t(common_vendor.unref(profile).nickname),
        d: common_vendor.t(common_vendor.unref(userLv).level)
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/\u6848\u4F8B/\u5C0F\u7A0B\u5E8F/\u7F51\u6613\u4E91\u97F3\u4E50/wyyMusic/components/loginBar/loginBar.vue"]]);
wx.createComponent(Component);
