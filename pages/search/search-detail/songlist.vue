<script setup lang='ts'>
import { useSearchStore } from '@/store';
import {
    transform_num_unit,
    to_music_library
} from "@/utils";
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
</script>

<template>
    <view
        v-for="item in searchStore.cur_search_data"
        :key="item.id"
        class="songlist-box"
        @click="to_music_library(item.id)"
    >   
        <image
            mode="widthFix"
            :src="item.coverImgUrl"
            class="songlist-pic"
        />
        <view class="songlist-content">
            <view class="songlist-title">{{item.name}}</view>
            <view class="songlist-subtitle">
                {{item.trackCount}} 首,
                <view class="songlist-name text-hidden">
                    by {{item.creator.nickname}}
                </view>
                ,
                <view class="songlist-playcount">
                    播放 {{transform_num_unit(item.playCount)}} 次
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="less" scope>
.songlist-content {
    flex: 1;
    overflow: hidden;

    .songlist-subtitle {
        display: flex;
        column-gap: 10rpx;
        overflow: hidden;
    }

    .songlist-name {
        flex: 1;
    }
}
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