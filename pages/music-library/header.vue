<script setup lang='ts'>
import { useMusicLibraryStore } from '@/store/store-music-library';
import { ref } from 'vue';

let store = useMusicLibraryStore()
const is_show_scroll_header = ref(false);
store.listener_page_scroll((scrollTop) => {
    if (scrollTop >= 100) {
        is_show_scroll_header.value = true;
    } else {
        is_show_scroll_header.value = false
    }
});

const animation = ref("scroll_header 10s linear 1s")
const animationend = () => {
    animation.value = "";
    setTimeout(() => {
        animation.value = "scroll_header 10s linear";
    }, 2000)
};
</script>

<template>
    <view
        class="music-library-header"
    >
        <!-- <text class="music-library-back iconfont">
            &#xe68d;
        </text> -->

        <view
            class="music-library-header-title"
            v-show="!is_show_scroll_header"
        >
            歌单
        </view>

        <view
            class="music-library-scroll-header-title"
            v-show="is_show_scroll_header"
        >
            <view
                class="music-library-scroll-header-text"
                @animationend="animationend"
                :style="{
                    animation
                }"
            >
                {{store.playlist.name}}
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                {{store.playlist.name}}
            </view>
        </view>

        <view
            class="music-library-subscribe"
            v-show="is_show_scroll_header"
        >
            <text class="iconfont">
                &#xe657;
            </text>
            收藏
        </view>

        <view class="music-library-search iconfont">
            &#xe684;
        </view>

        <view class="music-library-scheduler iconfont">
            &#xe67a;
        </view>
    </view>
</template>

<style lang="less">
.music-library-subscribe {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    column-gap: 12rpx;
    background-color: #FF2222;
    color: #fff;
    padding: 10rpx 20rpx;
    border-radius: 40rpx;

    .iconfont {
        font-size: 28rpx  !important;
    }
}
.music-library-header-title,
.music-library-scroll-header-title {
    flex: 1;
    overflow: hidden;
}
.music-library-scroll-header-text {
    // animation: name duration timing-function delay iteration-count direction fill-mode;
    // animation: scroll_header 10s linear 2s;
    white-space: nowrap;
}
@keyframes scroll_header {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-180%);
    }
}
.music-library-header {
    display: flex;
    padding: 20rpx;
    align-items: center;
    font-size: 38rpx;
    column-gap: 40rpx;
    position: relative;
    overflow: hidden;
    color: #fff;
    .iconfont {
        font-size: 42rpx;
    }
}
</style>