"use strict";
var utils_request = require("../utils/request.js");
const getSongDetail = (...ids) => {
  return utils_request.wxRequest({
    url: "/song/detail",
    data: {
      ids: ids.toString()
    }
  });
};
exports.getSongDetail = getSongDetail;
