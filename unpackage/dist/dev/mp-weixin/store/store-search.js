"use strict";
var common_vendor = require("../common/vendor.js");
var utils_localstorage = require("../utils/localstorage.js");
var utils_symbols = require("../utils/symbols.js");
var utils_request = require("../utils/request.js");
const useSearchStore = common_vendor.defineStore("search", () => {
  const search_keyword = common_vendor.ref("\u9AD8\u8003");
  const history = common_vendor.ref(utils_localstorage.getLocalStorage(utils_symbols.search_history_localstorage) || []);
  const push_history = (keyword) => {
    history.value.unshift(keyword);
    search_keyword.value = keyword;
    utils_localstorage.setLocalStorage("search_history_localstorage", history.value);
  };
  const clear_history = () => {
    history.value = [];
    utils_localstorage.setLocalStorage(utils_symbols.search_history_localstorage, []);
  };
  const input_keyword = (keyword) => {
    let filteredHistory = history.value.filter((k) => k != keyword);
    filteredHistory.unshift(keyword);
    history.value = filteredHistory;
    search_keyword.value = keyword;
    utils_localstorage.setLocalStorage(utils_symbols.search_history_localstorage, filteredHistory);
  };
  const search_timer = 200;
  const searchs = common_vendor.ref([]);
  const isSearching = common_vendor.ref(false);
  let timer;
  const onSearch = () => {
    search_nav_data.value = {};
    active_search_index.value = 0;
    if (typeof timer === "number") {
      clearTimeout(timer);
    }
    if (!search_keyword.value.trim() || !search_control_focus_flag.value) {
      return;
    }
    timer = setTimeout(async () => {
      clearTimeout(timer);
      let res = await utils_request.wxRequest({
        url: "/search/suggest",
        data: {
          keywords: search_keyword.value.trim(),
          type: "mobile"
        }
      });
      searchs.value = res.data.result.allMatch;
      isSearching.value = false;
    }, search_timer);
  };
  common_vendor.watch(() => search_keyword.value, onSearch);
  const search_control_focus_flag = common_vendor.ref(false);
  const clear_keyword = () => {
    search_keyword.value = "";
  };
  const search_control_focus = () => {
    search_control_focus_flag.value = true;
  };
  const search_control_blur = () => {
    search_control_focus_flag.value = false;
  };
  let search_nav_enum;
  ((search_nav_enum2) => {
    search_nav_enum2[search_nav_enum2["song"] = 1] = "song";
    search_nav_enum2[search_nav_enum2["songlist"] = 1e3] = "songlist";
    search_nav_enum2[search_nav_enum2["video"] = 1014] = "video";
    search_nav_enum2[search_nav_enum2["singer"] = 100] = "singer";
    search_nav_enum2[search_nav_enum2["songs_text"] = 1006] = "songs_text";
    search_nav_enum2[search_nav_enum2["song_collection"] = 10] = "song_collection";
    search_nav_enum2[search_nav_enum2["sound"] = 2e3] = "sound";
    search_nav_enum2[search_nav_enum2["user"] = 1002] = "user";
  })(search_nav_enum || (search_nav_enum = {}));
  const search_nav = [
    {
      title: "\u5355\u66F2",
      type: 1
    },
    {
      title: "\u6B4C\u5355",
      type: 1e3
    },
    {
      title: "\u89C6\u9891",
      type: 1014
    },
    {
      title: "\u6B4C\u624B",
      type: 100
    },
    {
      title: "\u6B4C\u8BCD",
      type: 1006
    },
    {
      title: "\u4E13\u8F91",
      type: 10
    },
    {
      title: "\u58F0\u97F3",
      type: 2e3
    },
    {
      title: "\u7528\u6237",
      type: 1002
    }
  ];
  const search_comp_loadflag = common_vendor.reactive(new Array(search_nav.length).fill(false));
  const loaded_search_comp = (index) => {
    search_comp_loadflag[index] = true;
  };
  let search_nav_data = common_vendor.ref({});
  let active_search_index = common_vendor.ref(0);
  let active_search_nav = common_vendor.computed$1(() => {
    return search_nav[active_search_index.value];
  });
  let loading = common_vendor.ref(false);
  const active_search_data = common_vendor.computed$1(() => {
    return active_search_data[active_search_index.value];
  });
  const change_active_search_nav = (index) => {
    active_search_index.value = index;
  };
  const get_search_nav_data = async () => {
    if (!search_keyword.value.trim()) {
      return;
    }
    let cache_search_nav_data = search_nav_data[active_search_nav.value.type];
    if (cache_search_nav_data) {
      return cache_search_nav_data;
    }
    loading.value = true;
    const type = active_search_nav.value.type;
    let res = await utils_request.wxRequest({
      url: "/cloudsearch",
      data: {
        keywords: search_keyword.value.trim(),
        type
      }
    });
    let data = null;
    if (type === 1) {
      data = res.data.result.songs;
    } else if (type === 1e3) {
      data = res.data.result.playlists;
    }
    search_nav_data.value[active_search_nav.value.type] = data;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  };
  const cur_search_data = common_vendor.computed$1(() => {
    return search_nav_data.value[active_search_nav.value.type];
  });
  return {
    cur_search_data,
    active_search_data,
    search_nav_enum,
    search_comp_loadflag,
    loaded_search_comp,
    search_nav,
    active_search_nav,
    change_active_search_nav,
    get_search_nav_data,
    search_nav_data,
    active_search_index,
    searchs,
    search_keyword,
    history,
    push_history,
    input_keyword,
    clear_keyword,
    clear_history,
    search_control_focus,
    search_control_blur,
    search_control_focus_flag,
    loading
  };
});
exports.useSearchStore = useSearchStore;
