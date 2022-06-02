<script setup lang='ts'>
import {  
    useSearchStore,
} from "@/store";
import { computed } from "vue";
const searchStore = useSearchStore();
const songs = computed(() => {
    return searchStore.search_nav_data[
        searchStore.active_search_nav.type
    ] || [];
})
defineExpose({
    load() {
        searchStore.get_search_nav_data();
    }
});
</script>

<template>
    <view
        class="search-detail-songbox"
        v-for="item in songs"
        :key="item.id"
    >
        <view class="search-detail-title">
            {{item.name}}
        </view>
        <view class="search-detail-subtitle">
            <text
                v-for="item in item.ar"
                :key="item.id"
            >
                {{item.name}}
            </text>
            -
            <text>{{item.al.name}}</text>

        </view>
        <view class="search-detail-more">

        </view>
    </view>
</template>

<style lang="less">
.search-detail-title {
    font-size: 36rpx;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.search-detail-subtitle {
    font-size: 30rpx;
    color: #999;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.search-detail-songbox {
    box-sizing: border-box;
    padding: 20rpx;
}
</style>