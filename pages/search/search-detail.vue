<script setup lang='ts'>
import Songlist from "./search-detail/songlist.vue";
import Songs from "@/pages/search/search-detail/songs.vue";
import {
    useSearchStore
} from "@/store";
import { effect, nextTick, onMounted, reactive, watch } from "vue";
const search_store = useSearchStore();
const lazy_comps = reactive({});

onMounted(() => {
    // 根据选中的导航, 触发渲染对应的组件
    effect(() => {
        let current_search_comp = lazy_comps[
            search_store.active_search_nav.type
        ];
        if (
            current_search_comp &&
            !search_store.search_nav_data[search_store.active_search_nav.type]
        ) {
            // 调用当前选中导航 对应的组件 的load方法
            current_search_comp.load && current_search_comp.load();
        };
    })
});

const set_lazy_comp = (index: number) => {
    return (el: any) => {
        // 如果懒加载组件中当前项为null才赋值对应的组件
        if (lazy_comps[index] == null) {
            lazy_comps[index] = el;
        }
    }
};

</script>

<template>
    <view class="search-detail-container">
        <view class="search-detail-navbar">
            <!-- 导航 -->
            <view
                class="search-detail-nav"
                v-for="(item, index) in search_store.search_nav"
                :class="{
                    active: index === search_store.active_search_index
                }"
                :key="item.title"
                @click="search_store.change_active_search_nav(index)"
            >
                {{item.title}}
            </view>
        </view>
        <view class="search-detail-comp">
            <loading
                v-show="search_store.loading"
                styles="padding: 100rpx 0;"
            />
            <view
                v-show="!search_store.loading"
                style="width: 100%;height: 100%;"
            >
                <Songs
                    :ref="set_lazy_comp(search_store.search_nav_enum.song)"
                    v-if="
                        search_store.search_nav_enum.song 
                        === 
                        search_store.active_search_nav.type
                    "
                />
                <Songlist
                    :ref="set_lazy_comp(search_store.search_nav_enum.songlist)"
                    v-if="
                        search_store.search_nav_enum.songlist
                        === 
                        search_store.active_search_nav.type
                    "
                />
            </view>
        </view>
    </view>
</template>

<style lang="less">
.search-detail-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.search-detail-comp {
    flex: 1;
    overflow-y: scroll;
}
.search-detail-nav {
    padding: 38rpx;

    &.active {
        // font-size: 36rpx;
        font-weight: bold;
    }
}
.search-detail-navbar {
    // 导航外层容器
    display: flex;
    // align-items: center;
    box-sizing: border-box;
    white-space: nowrap;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    // position: fixed;
    // top: 82rpx;
    // left: 0;
    // background-color: #fff;
}
</style>