"use strict";
var common_vendor = require("../../common/vendor.js");
var api_user = require("../../api/user.js");
var api_handSong = require("../../api/handSong.js");
require("../../store/store-search.js");
var store_storeUserInfo = require("../../store/store-user-info.js");
require("../../utils/request.js");
require("../../utils/localstorage.js");
require("../../utils/symbols.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const store = store_storeUserInfo.useUserInfo();
    const userInfo = store.userInfo;
    const total = common_vendor.ref(0);
    const firstSong = common_vendor.ref({});
    const getFirstSong = async (mid) => {
      const { data } = await api_handSong.getSongDetail(mid);
      if (data.code === 200) {
        firstSong.value = data.songs[0];
      }
    };
    const getList = async () => {
      const { data } = await api_user.getLikeList(userInfo.profile.userId);
      const length = data.ids && data.ids.length;
      if (data.code === 200 && data.ids && length) {
        total.value = length;
        store.setIdList(data.ids);
        getFirstSong(data.ids[0]);
      }
    };
    const shoudleLoadList = () => {
      if (userInfo.login && !total.value) {
        getList();
      }
    };
    common_vendor.onMounted(shoudleLoadList);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: firstSong.value.al
      }, firstSong.value.al ? {
        b: firstSong.value.al.picUrl + "?param=50y50"
      } : {}, {
        c: common_vendor.t(total.value)
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/\u6848\u4F8B/\u5C0F\u7A0B\u5E8F/\u7F51\u6613\u4E91\u97F3\u4E50/wyyMusic/components/myLikeMusic/myLikeMusic.vue"]]);
wx.createComponent(Component);
