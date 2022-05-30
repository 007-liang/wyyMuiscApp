"use strict";
var utils_request = require("../../utils/request.js");
var common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  data() {
    return {
      musics: []
    };
  },
  async created() {
    let res = await utils_request.wxRequest({
      url: "/personalized/newsong",
      data: {
        limit: 5
      }
    });
    this.musics = res.data.result;
  },
  methods: {}
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(_ctx.musics, (item, k0, i0) => {
      return {
        a: item.picUrl,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.song.album.name),
        d: common_vendor.f(item.song.artists, (item2, k1, i1) => {
          return {
            a: common_vendor.t(item2.name),
            b: item2.id
          };
        }),
        e: item.id
      };
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/\u6848\u4F8B/\u5C0F\u7A0B\u5E8F/\u7F51\u6613\u4E91\u97F3\u4E50/wyyMusic/pages/search/music.vue"]]);
wx.createComponent(Component);