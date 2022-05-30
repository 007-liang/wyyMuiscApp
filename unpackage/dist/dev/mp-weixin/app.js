"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
require("./store/store-search.js");
var store_storeUserInfo = require("./store/store-user-info.js");
var utils_localstorage = require("./utils/localstorage.js");
var utils_request = require("./utils/request.js");
require("./utils/symbols.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/search/search.js";
  "./pages/index/index.js";
  "./pages/my/my.js";
}
const _sfc_main = {
  async onLaunch() {
    const storeUserInfo = store_storeUserInfo.useUserInfo();
    const cookie = utils_localstorage.getLocalStorage("cookie");
    const {
      data: {
        data
      }
    } = await utils_request.wxRequest({
      url: "/login/status",
      data: { cookie }
    });
    if (data.code === 200 && data.profile !== null && !isNaN(data.profile.userId)) {
      storeUserInfo.setUserInof(data);
    }
  },
  onShow: function() {
  },
  onHide: function() {
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/\u6848\u4F8B/\u5C0F\u7A0B\u5E8F/\u7F51\u6613\u4E91\u97F3\u4E50/wyyMusic/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  const pinia = common_vendor.createPinia();
  app.use(pinia);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
