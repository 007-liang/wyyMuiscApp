"use strict";
require("../store/audio.js");
require("../store/playing-song.js");
require("../store/store-search.js");
var store_storeUserInfo = require("../store/store-user-info.js");
require("../store/history-library.js");
require("../store/like-music-library.js");
require("../store/store-music-library.js");
require("../store/playing-song-library.js");
var utils_request = require("../utils/request.js");
require("../utils/play-strategy.js");
const getLikeList = (uid) => {
  return utils_request.wxRequest({
    url: "/likelist",
    data: {
      uid,
      cookie: store_storeUserInfo.userInfo.cookie
    }
  });
};
const getUserLevel = () => {
  return utils_request.wxRequest({
    url: "/user/level",
    data: {
      cookie: store_storeUserInfo.userInfo.cookie
    }
  });
};
const getLoginStatus = (cookie) => {
  return utils_request.wxRequest({
    url: "/login/status",
    data: {
      cookie: cookie || store_storeUserInfo.userInfo.cookie
    }
  });
};
const sendLogin = (phone, md5_password) => {
  return utils_request.wxRequest({
    url: "/login/cellphone",
    data: {
      phone,
      md5_password
    }
  });
};
const sendCaptcha = (phone) => {
  return utils_request.wxRequest({
    url: "/captcha/sent",
    data: { phone }
  });
};
const getValidateCode = (phone, captcha) => {
  return utils_request.wxRequest({
    url: "/captcha/verify",
    data: {
      phone,
      captcha
    }
  });
};
exports.getLikeList = getLikeList;
exports.getLoginStatus = getLoginStatus;
exports.getUserLevel = getUserLevel;
exports.getValidateCode = getValidateCode;
exports.sendCaptcha = sendCaptcha;
exports.sendLogin = sendLogin;
