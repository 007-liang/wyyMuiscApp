"use strict";
var common_vendor = require("../common/vendor.js");
var utils_localstorage = require("../utils/localstorage.js");
var utils_symbols = require("../utils/symbols.js");
require("../utils/request.js");
const useSearchStore = common_vendor.defineStore("search", () => {
  const search_keyword = common_vendor.ref("");
  const history = common_vendor.ref(utils_localstorage.getLocalStorage(utils_symbols.search_history_localstorage) || [
    "So Far Away",
    "\u5B64\u52C7\u8005",
    "\u53CD\u65B9\u5411\u7684\u949F",
    "C"
  ]);
  const input_keyword = (keyword) => {
    search_keyword.value = keyword;
  };
  return {
    search_keyword,
    history,
    input_keyword
  };
});
exports.useSearchStore = useSearchStore;
