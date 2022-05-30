"use strict";
function request(baseUrl, options) {
  options.url = baseUrl + options.url;
  let {
    success: successFn,
    fail: failFn
  } = options;
  let success = (res) => {
    successFn && successFn(res);
    return res;
  };
  let fail = (err) => {
    failFn && failFn(err);
    return err;
  };
  return new Promise((resolve, reject) => {
    options.success = (res) => {
      resolve(res);
    };
    options.fail = (err) => {
      reject(err);
    };
    wx.request(options);
  }).then(success).catch(fail);
}
let wxRequest = request.bind(null, "http://127.0.0.1:3000");
exports.wxRequest = wxRequest;
