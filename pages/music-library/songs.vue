<script setup lang='ts'>
import { useMusicLibraryStore } from '@/store/store-music-library';
import SongsLists from './songs-lists.vue';
const store = useMusicLibraryStore();
</script>

<template>
    <view class="music-library-songsbox">
        <view
            class="music-library-songs"
        >
            <SongsLists
                :musics="store.musics"
                v-show="!store.loading"
            />
            <loading
                v-show="store.loading"
                styles="padding: 270rpx 0;text-align: center;"
            />
            <!-- <view
                class="music-library-song"
                v-for="(item, index) in store.musics"
                :key="item.id"
            >
                <view class="music-library-song-index">
                    {{index + 1}}
                </view>
                <view class="music-library-song-detail">
                    <view class="music-library-song-name text-hidden">
                        {{item.name}}
                    </view>
                    <view class="text-hidden">
                        <tag-vip v-if="item.fee === 1"/>
                        <tag-sq v-if="item.sq" />

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
            </view> -->
        </view>
    </view>
</template>

<style lang="less" scoped>
.music-library-song {
    display: flex;
    column-gap: 40rpx;
    align-items: center;
    padding: 20rpx 40rpx;
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
}
.music-library-songsbox {
    margin-top: -2rpx;
    padding: 20rpx 0;
    background-color: #fff;
}
</style>