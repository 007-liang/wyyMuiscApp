"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_index = require("../../utils/index.js");
var utils_request = require("../../utils/request.js");
if (!Math) {
  Header();
}
const Header = () => "./components/list-header.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    let new_songs = common_vendor.ref([]);
    const get_new_songs = async () => {
      let res = await utils_request.wxRequest({
        url: "/personalized",
        data: {
          limit: 6
        }
      });
      new_songs.value = res.data.result;
    };
    get_new_songs();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "\u63A8\u8350\u6B4C\u5355"
        }),
        b: common_vendor.f(common_vendor.unref(new_songs), (item, k0, i0) => {
          return {
            a: item.picUrl + "?param=160y160",
            b: common_vendor.t(common_vendor.unref(utils_index.transform_num_unit)(item.playCount)),
            c: common_vendor.t(item.name),
            d: item.id,
            e: common_vendor.o(($event) => common_vendor.unref(utils_index.to_music_library)(item.id), item.id)
          };
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u6587\u6863/\u8BFE\u7A0B/\u5C0F\u7A0B\u5E8F/cloudmusic/pages/index/news-songlist.vue"]]);
wx.createComponent(Component);
