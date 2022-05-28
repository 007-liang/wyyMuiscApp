"use strict";
var common_vendor = require("../../common/vendor.js");
const history = () => "./history.js";
const _sfc_main = {
  components: {
    history
  },
  data() {
    return {};
  },
  setup(context) {
  },
  methods: {}
};
if (!Array) {
  const _component_history = common_vendor.resolveComponent("history");
  _component_history();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4cedc0c6"], ["__file", "D:/\u6587\u6863/\u8BFE\u7A0B/\u5C0F\u7A0B\u5E8F/cloudmusic/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
