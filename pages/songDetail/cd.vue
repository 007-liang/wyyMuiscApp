<script setup lang='ts'>
import { usePlayingSongStore } from "@/store/playingSong";
import cdSwiperVue from "./cdSwiper.vue";

const { state } = usePlayingSongStore(); 
</script>

<template>
    <view 
        class="cd"
        @click="state.showLyric = true"
    >
        <view class="cd-bg pause"></view>
        <image 
            class="stylus" 
            :class="{ pause: !state.playing }"
            src="/static/needle-ab.png"
        />
        <cdSwiperVue></cdSwiperVue>
    </view>
</template>

<style lang='less'>
.cd {
    position: relative;
    height: 60%;
}
.center {
    position: absolute;
    left: 50%;
}
.cd-bg {
    .center();
    top: 18%;
    width: 340rpx;
    height: 340rpx;
    border-radius: 50%;
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.1);
}
.stylus {
    .center();
    top: 0;
    width: calc(250rpx / 2);
    height: calc(409rpx / 2);
    transform: translateX(-25%);
    transform-origin: top left;
    transition: transform 0.5s;
    z-index: 10;
}
.stylus.pause {
    transform: translateX(-25%) rotate(-20deg);
}
</style>
