"use strict";
var common_vendor = require("../common/vendor.js");
const useUserInfo = common_vendor.defineStore("user-info", () => {
  const state = common_vendor.reactive({});
  const setUserInof = (userInfo) => {
    state.account = userInfo.account;
    state.loginType = userInfo.loginType;
    state.profile = userInfo.profile;
    state.token = userInfo.token;
  };
  return {
    state,
    setUserInof
  };
});
exports.useUserInfo = useUserInfo;
