<script setup lang='ts'>
import {  
    useSearchStore,
} from "@/store";
import {
    to_song_detail
} from "@/utils";
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
// const get_id = (data: IMusicDetail) => {
//     return data.name
// }
</script>

<template>
    <view
        class="search-detail-songbox"
        v-for="item in songs"
        :key="item.id"
        @click="to_song_detail(item.id)"
    >
        <view class="search-detail-title ellipsis">
            {{item.name}}
        </view>
        <view class="search-detail-subtitle ellipsis">
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
    <!-- <fixedSizeList
        :item-count="songs.length"
        :item-size="60"
        :height="566"
        :width="414"
        :data="songs"
        :id="get_id"
    >
        <template #default="{ index, style, item }">
            <view :style="style" class="search-detail-songbox">
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
    </fixedSizeList> -->
</template>

<style lang="less">
.search-detail-title {
    font-size: 36rpx;
    width: 100%;
}
.search-detail-subtitle {
    font-size: 30rpx;
    color: #999;
    width: 100%;
}
.search-detail-songbox {
    box-sizing: border-box;
    padding: 20rpx;
}
</style>