<script lang='ts' setup>
import { transform_num_unit } from '@/utils';

const props = defineProps<{
    picUrl: string;
    playCount: number;
    name: string;
    sid: number
}>();
</script>

<template>
    <view class="news-songs" @click="$emit('click', e)">
        <image
            class="news-songs-pic"
            mode="widthFix"
            :src="props.picUrl + '?param=160y160'"
        />
        <view class="playCount">
            <text class="iconfont">
                &#xe75d;
            </text>
            {{transform_num_unit(props.playCount)}}
        </view>
        <view class="news-song-name">
            {{props.name}}
        </view>
    </view>
</template>

<style lang='less'>
.news-songs-pic {
    width: 260rpx;
    border-radius: 20rpx;
}

.news-songs {
    position: relative;
}

.playCount {
    position: absolute;
    right: 10rpx;
    top: 10rpx;
    color: #fff;
    background-color: rgba(0, 0, 0, .4);
    padding: 10rpx;
    border-radius: 30rpx;
    font-size: 24rpx;
}

.news-song-name {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
</style>
