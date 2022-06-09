<script setup lang='ts'>
import { usePlayingSongStore } from "@/store";
import cdSwiperVue from "./cdSwiper.vue";

const { 
    playingSongState: state 
} = usePlayingSongStore(); 
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
    top: 30%;
    width: 500rpx;
    height: 500rpx;
    border-radius: 50%;
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.1);
}
.stylus {
    .center();
    top: 3%;
    width: calc(250rpx / 1.3);
    height: calc(409rpx / 1.3);
    transform: translateX(-25%) rotate(-5deg);
    transform-origin: 10px 10px;
    transition: transform 0.5s;
    z-index: 10;
}
.stylus.pause {
    transform: translateX(-25%) rotate(-20deg);
}
</style>
