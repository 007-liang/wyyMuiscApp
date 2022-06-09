"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
<<<<<<< HEAD
require("./store/audio.js");
require("./store/playing-song.js");
require("./store/store-search.js");
var store_storeUserInfo = require("./store/store-user-info.js");
var store_historyLibrary = require("./store/history-library.js");
require("./store/store-music-library.js");
require("./store/playing-song-library.js");
var utils_localstorage = require("./utils/localstorage.js");
require("./utils/request.js");
=======
var utils_localstorage = require("./utils/localstorage.js");
require("./utils/request.js");
require("./store/audio.js");
require("./store/playingSong.js");
require("./store/store-search.js");
var store_storeUserInfo = require("./store/store-user-info.js");
require("./store/store-music-library.js");
>>>>>>> 1a0ac77e42b6c066ca79ac2e572eb36f2e909e1d
var api_user = require("./api/user.js");
require("./utils/index.js");
require("./utils/symbols.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/songDetail/songDetail.js";
  "./pages/music-library-search/music-library-search.js";
  "./pages/music-library/music-library.js";
  "./pages/my/my.js";
  "./pages/login/login.js";
  "./pages/search/search.js";
  "./pages/loading/loading.js";
}
const _sfc_main = {
  async onLaunch() {
    const cookie = utils_localstorage.getLocalStorage("cookie");
    const storeUserInfo = store_storeUserInfo.useUserInfo();
    let {
      data: {
        data
      }
    } = await api_user.getLoginStatus(cookie);
    if (data.code === 200 && data.profile !== null && !isNaN(data.profile.userId)) {
      data.cookie = cookie;
      storeUserInfo.setUserInfo(data);
    }
  },
  onShow: function() {
  },
  onHide: function() {
    const {
      historyList
    } = store_historyLibrary.useHistoryLibrary();
    utils_localstorage.setLocalStorage("history-list", historyList);
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u6587\u6863/\u8BFE\u7A0B/\u5C0F\u7A0B\u5E8F/cloudmusic/App.vue"]]);
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
