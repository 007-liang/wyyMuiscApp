"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    let sings = common_vendor.ref([]);
    async function getData() {
      let res = await utils_request.wxRequest({
        url: "/top/artists",
        data: {
          offset: 0,
          limit: 10
        }
      });
      sings.value = res.data.artists;
    }
    getData();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(sings), (item, k0, i0) => {
          return {
            a: item.picUrl,
            b: common_vendor.t(item.name),
            c: item.name
          };
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/\u6848\u4F8B/\u5C0F\u7A0B\u5E8F/\u7F51\u6613\u4E91\u97F3\u4E50/wyyMusic/pages/search/hot-sings.vue"]]);
wx.createComponent(Component);