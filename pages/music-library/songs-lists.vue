<script setup lang='ts'>
import { get_song_ar } from "@/utils";

const props = withDefaults(
    defineProps<{
        musics: IMusicDetail[],
        showIndex?: boolean
    }>(),
    {
        showIndex: true
    }
);
</script>

<template>
    <navigator
        open-type="navigate"
        hover-class="none"
        class="music-library-song"
        v-for="(item, index) in props.musics"
        :key="item.id"
        :url="`/pages/songDetail/songDetail?id=${item.id}`"
    >
        <view class="music-library-song-index" v-if="props.showIndex">
            {{index + 1}}
        </view>
        <view class="music-library-song-detail">
            <view class="music-library-song-name text-hidden">
                {{item.name}}
            </view>
            <view class="text-hidden">
                <tagVip v-if="item.fee === 1" />
                <tagSq v-if="item.sq" />

                {{get_song_ar(item).join("/")}}
                -
                {{item.al.name}}
            </view>
        </view>
        <view class="iconfont" v-if="item.mv !== 0">
            &#xe602;
        </view>
        <view class="iconfont">
            &#xe67a;
        </view>
    </navigator>
</template>

<style lang="less" scoped>
.music-library-song {
    display: flex;
    column-gap: 40rpx;
    align-items: center;
    padding: 20rpx 40rpx;
}
.music-library-song-index {
    color: #999;
    font-size: 38rpx;
    width: 60rpx;
    text-align: center;
}

.music-library-song-detail {
    flex: 1;
    // width: 520rpx;
    overflow: hidden;
}

.music-library-song-name {
    margin-bottom: 10rpx;
    font-size: 34rpx;
}

.iconfont {
    font-size: 50rpx;
    color: #999
}
</style>