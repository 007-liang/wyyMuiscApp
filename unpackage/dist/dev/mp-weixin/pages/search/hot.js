"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      hotBar: [
        {
          title: "\u70ED\u641C\u699C",
          url: "/search/hot"
        },
        {
          title: "\u70ED\u641C\u699C2",
          url: "/search/hot"
        }
      ],
      activeHotBarIndex: 0,
      hots: [],
      videos: [],
      users: []
    };
  },
  setup() {
  },
  async created() {
    let res = await utils_request.wxRequest({
      url: "/search/hot"
    });
    this.hots = res.data.result.hots;
    console.log(this.hots);
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(_ctx.hotBar, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: item.title,
        c: common_vendor.o(($event) => _ctx.activeHotBarIndex = index, item.title),
        d: _ctx.activeHotBarIndex == index ? 1 : ""
      };
    }),
    b: common_vendor.f(_ctx.hots, (item, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: common_vendor.t(item.first),
        c: item.first
      };
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u6587\u6863/\u8BFE\u7A0B/\u5C0F\u7A0B\u5E8F/cloudmusic/pages/search/hot.vue"]]);
wx.createComponent(Component);
