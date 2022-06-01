<script setup lang='ts'>
import { useSearchStore } from '@/store';
import { computed } from 'vue';
const searchStore = useSearchStore();
let load = false;
defineExpose({
    load() {
        if (load) {
            return;
        };
        load = true;
        searchStore.get_search_nav_data();
    }
});
let unit = {
    1: "万",
    2: "千万",
    3: "亿"
}

</script>

<template>
    <view
        v-for="item in searchStore.cur_search_data"
        :key="item.name"
        class="songlist-box"
    >   
        <image
            mode="widthFix"
            :src="item.coverImgUrl"
            class="songlist-pic"
        />
        <view class="songlist-content">
            <view class="songlist-title">{{item.name}}</view>
            <view class="songlist-subtitle">
                {{item.trackCount}} 首
                by {{item.creator.nickname}}
                播放 <!-- {{getPlayCount(item.playCount)}} --> 次
            </view>
        </view>
    </view>
</template>

<style lang="less">
.songlist-box {
    display: flex;
    gap: 20rpx;
    padding: 0 30rpx;
    padding-bottom: 20rpx;
}
.songlist-pic {
    width: 140rpx;
    border-radius: 20rpx;
}

.songlist-title {
    font-size: 32rpx;
    margin: 20rpx 0;
    font-weight: bold;
}
</style>