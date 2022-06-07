<script lang='ts' setup>
import { usePlayingSongStore } from '@/store';
const list = [
    'https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_e835568.png',
    'https://www.processon.com/assets/imgs/logo_small.svg',
    'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/1ae87107-2943-4ba6-be2b-390ca27c6260.png'
];
const  { state } = usePlayingSongStore();
</script>

<template>
    <swiper 
        class="cd-swiper" 
        easing-function="linear" 
        current="1"
    >
        <swiper-item
            v-for="(itme, i) in list" 
            :key="i"
            class="cd-swiper-item"
        >
            <view 
                class="cd-cover-box"
                :class="{paused: !state.playing}"
            >
                <image 
                    class="cd-cover" 
                    :src="state.picUrl + '?param=110y100'" 
                />
            </view>
        </swiper-item>
    </swiper>
</template>

<style lang='less'>
.cd-swiper {
    position: relative;
    top: 18%;
    height: 340rpx;
}
.cd-swiper-item {
    display: flex;
    justify-content: center;
    align-items: center;
}
.cd-cover-box {
    box-sizing: border-box;
    position: relative;
    display: flex;
    width: 330rpx;
    height: 330rpx;
    justify-content: center;
    align-items: center;
    background: url('/static/disc.png') center no-repeat;
    background-size: 110%;
    border-radius: 50%;
    animation: rotate 20s linear infinite;
    overflow: hidden;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('/static/996fc8a2bc62e1ab3f51f135fc459577.png') center no-repeat;
        background-size: cover;
    }
}
.cd-cover {
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
    overflow: hidden;
}
.paused {
    animation-play-state: paused;
}
@keyframes rotate{
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
