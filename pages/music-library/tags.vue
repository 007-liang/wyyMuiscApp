<script setup lang='ts'>
import { useMusicLibraryStore } from '@/store/store-music-library';
import {
    transform_num_unit
} from "@/utils";

const store = useMusicLibraryStore();

</script>

<template>
    <view class="music-library-tags">
        <view class="music-library-tags-bg"></view>
        <view class="music-library-tag-box">
            <view class="music-library-tag">
                <text class="iconfont">
                    &#xe657;
                </text>
                {{transform_num_unit(store.playlist.subscribedCount)}}
            </view>
            <view class="music-library-tag">
                <text class="iconfont">
                    &#xe7f5;
                </text>
                {{transform_num_unit(store.playlist.commentCount)}}
            </view>
            <view class="music-library-tag">
                <text class="iconfont">
                    &#xe739;
                </text>
                {{transform_num_unit(store.playlist.shareCount)}}
            </view>
        </view>
    </view>
</template>

<style lang="less" scoped>
.music-library-tag-box {
    position: absolute;
    top: -20rpx;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 40rpx;
    height: 100%;
    box-sizing: border-box;
    padding: 40rpx 40rpx;
    display: flex;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 0 32rpx 0 #b6b6b6;
    font-size: 32rpx;

    .music-library-tag {
        padding: 0 20rpx;
        border-right: 2rpx solid #ddd;
        white-space: nowrap;
        &:last-of-type {
            border-right: none;
        }
    }

    .iconfont {
        font-size: 34rpx;
        margin-right: 12rpx;
    }
}
.music-library-tags {
    width: 100%;
    height: 80rpx;
    position: relative;
}
.music-library-tags-bg {
    height: 100%;
    // clip-path: path("M 0 0 L 0 10, M 0 10 L 0 -10, M 0 10 L 0 10, Z");
    background-color: #fff;
    border-radius: 100% 100% 0 0;
}
</style>