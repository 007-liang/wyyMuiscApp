"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: {
    title: { type: String, required: true },
    path: { type: String, required: false }
  },
  setup(__props) {
    const props = __props;
    const to_path = () => {
      props.path && wx.navigateTo({
        url: props.path
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.title),
        b: common_vendor.o(to_path)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u6587\u6863/\u8BFE\u7A0B/\u5C0F\u7A0B\u5E8F/cloudmusic/pages/index/list-header.vue"]]);
wx.createComponent(Component);
