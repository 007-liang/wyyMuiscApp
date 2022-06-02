"use strict";
var common_vendor = require("../common/vendor.js");
const userInfo = common_vendor.reactive({
  login: false,
  cookie: ""
});
const useUserInfo = common_vendor.defineStore("user-info", () => {
  const userLv = common_vendor.reactive({
    level: "--"
  });
  const userLikeIdList = common_vendor.reactive([]);
  const setUserInfo = (data) => {
    userInfo.login = true;
    userInfo.cookie = data.cookie;
    userInfo.account = data.account;
    userInfo.profile = data.profile;
  };
  const setUserLv = (data) => {
    let key;
    for (key in data) {
      userLv[key] = data[key];
    }
  };
  const setIdList = (ids) => userLikeIdList.push(...ids);
  return {
    userInfo,
    userLv,
    userLikeIdList,
    setUserLv,
    setUserInfo,
    setIdList
  };
});
exports.useUserInfo = useUserInfo;
exports.userInfo = userInfo;
