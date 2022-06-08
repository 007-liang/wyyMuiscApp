import { defineStore } from "pinia";
import { computed, reactive, ref, watch } from "vue";
import type { Ref } from "vue";

import {
	getLocalStorage,
    search_history_localstorage,
    setLocalStorage,
    wxRequest,
} from "@/utils";

export const useSearchStore = defineStore("search", () => {
    const search_keyword = ref("");
    const history = ref(
        getLocalStorage(search_history_localstorage) || []
    ) as Ref<string[]>;
    // 添加历史信息
    const push_history = (keyword: string) => {
        history.value.unshift(keyword);
        search_keyword.value = keyword;
        setLocalStorage("search_history_localstorage", history.value);
    }
    // 清空历史信息
    const clear_history = () => {
        history.value = [];
        setLocalStorage(search_history_localstorage, []);
    };
    // 历史信息 输入成 关键字
    const input_keyword = (keyword: string) => {
        let filteredHistory = history.value.filter(k => k != keyword);
        filteredHistory.unshift(keyword);
        history.value = filteredHistory;
        search_keyword.value = keyword;

        setLocalStorage(search_history_localstorage, filteredHistory);
    };

    const search_timer = 200;
    const searchs = ref<ISearchKeyWordMatch[]>([]);
    const isSearching = ref(false);
    let timer: number;
    // 搜索关键词
    const onSearch = () => {
        search_nav_data.value = {};
        active_search_index.value = 0;

        if (typeof timer === 'number') {
            // 清除上一次的 timeout 的timer
            clearTimeout(timer);
        };
        
        // 搜索框没内容
        // 搜索框无聚焦
        // 都不进行搜索
        if (!search_keyword.value.trim() || !search_control_focus_flag.value) {
            return;
        };
        timer = setTimeout(async () => {
            clearTimeout(timer);
            let res = await wxRequest<ISearchKeyword>({
                url: "/search/suggest",
                data: {
                    keywords: search_keyword.value.trim(),
                    type: "mobile"
                }
            });
            searchs.value = res.data.result.allMatch;
            isSearching.value = false;
        }, search_timer)
    };
    watch(
        () => search_keyword.value,
        onSearch
    )
    
    // 搜索框聚焦 搜索框有内容 显示 搜索关键词
    // 搜索框不聚焦 搜索框有内容 就显示 搜索关键词后的内容
    const search_control_focus_flag = ref(false);
    const clear_keyword = () => {
        search_keyword.value = "";
    };
    const search_control_focus = () => {
        search_control_focus_flag.value = true;
    };
    const search_control_blur = () => {
        search_control_focus_flag.value = false;
    }

    /* 
        1018:综合
        1: 单曲
        1000: 歌单
        1014: 视频
        100: 歌手
        1006: 歌词
        10: 专辑
        2000:声音
        1002: 用户
        // 1004: MV
        // 1009: 电台
    */
    // 导航对应的页面 的请求参数type的值
    enum search_nav_enum {
        /**
         * @description 单曲
         */
        song = 1, 

        /**
         * @description 歌单
         */
        songlist = 1000, 

        /**
         * @description 视频
         */
        video = 1014,

        /**
         * @description 歌手
         */
        singer = 100,

        /**
         * @description 歌词
         */
        songs_text = 1006,

        /**
         * @description 专辑
         */
        song_collection = 10,

        /**
         * @description 声音
         */
        sound = 2000,

        /**
         * @description 用户
         */
        user = 1002
    };
    // 导航
    const search_nav = [
        /* {
            title: "综合",
            type: "1018"
        }, */
        {
            title: "单曲",
            type: search_nav_enum.song,
        },
        {
            title: "歌单",
            type: search_nav_enum.songlist
        },
        {
            title: "视频",
            type: search_nav_enum.video
        },
        {
            title: "歌手",
            type: search_nav_enum.singer
        },
        {
            title: "歌词",
            type: search_nav_enum.songs_text
        },
        {
            title: "专辑",
            type: search_nav_enum.song_collection,
        },
        {
            title: "声音",
            type: search_nav_enum.sound
        },
        {
            title: "用户",
            type: search_nav_enum.user
        }
    ];
    // 加载过的组件不会v-if重新渲染
    const search_comp_loadflag = reactive(
        new Array(search_nav.length).fill(false)
    );
    // 设置组件是否进行加载
    const loaded_search_comp = (index: number) => {
        search_comp_loadflag[index] = true;
    };
    // 已经加载过的页面, 进行缓存数据
    let search_nav_data = ref({});
    // 当前选中的导航索引
    let active_search_index = ref(0);
    // 当前选中导航的type
    // let active_search_nav = ref(search_nav[0]);
    let active_search_nav = computed(() => {
        return search_nav[active_search_index.value]
    });
    let loading = ref(false);
    const active_search_data = computed(() => {
        return active_search_data[active_search_index.value];
    });
    // 改变选中导航, 更新 选中索引和选中type
    const change_active_search_nav = (index: number) => {
        // active_search_nav.value = search_nav[index];
        active_search_index.value = index;
    };
    const get_search_nav_data = async () => {
        if (!search_keyword.value.trim()) {
            return;
        };
        let cache_search_nav_data = search_nav_data[
            active_search_nav.value.type
        ];
        if (cache_search_nav_data) {
            return cache_search_nav_data;
        };
        loading.value = true;
        const type = active_search_nav.value.type;
        let res = await wxRequest<any>({
            url: "/cloudsearch",
            data: {
                keywords: search_keyword.value.trim(),
                type: type,
            }
        });
        let data = null
        if (type === search_nav_enum.song) {
            data = res.data.result.songs;
        } else if (type === search_nav_enum.songlist) {
            data = res.data.result.playlists;
        };
        search_nav_data.value[
            active_search_nav.value.type
        ] = data;
        setTimeout(() => {
            loading.value = false;
        }, 500);
    };
    const cur_search_data = computed(() => {
        return search_nav_data.value[
            active_search_nav.value.type
        ];
    })

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

        loading,
    }
});