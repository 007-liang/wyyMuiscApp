<script setup lang='ts'>
import { 
    useAudioStore, 
    usePlayingSongStore 
} from '@/store';
import { numToDateFormat } from '@/utils';
import { 
    getCurrentInstance, 
    onMounted, 
    ref 
} from 'vue';

let ratio = 0;
const rect = ref({} as UniApp.NodeInfo);
const instance = getCurrentInstance();
const {
    playingSongState: state,
} = usePlayingSongStore();
const {
    audioCtx,
    updateProgress
} = useAudioStore();

// 手指按下
const jumpProgress = (e: any) => {
    const [{ pageX }] = e.touches;
    const { offsetLeft } = e.currentTarget;
    const currentX = pageX - offsetLeft;
    ratio = currentX / rect.value.width!;
    state.progress = +(ratio * 100).toFixed(2);
    state.currentTime = Math.floor(audioCtx.duration * ratio);
    audioCtx.offTimeUpdate(updateProgress);
};

// 拖拽进度
const touchmove = (e: any) => {
    const [{ pageX }] = e.touches;
    const { offsetLeft } = e.currentTarget;
    const currentX = pageX - offsetLeft;
    if (currentX > rect.value.width! || currentX < 0) return;
    ratio = currentX / rect.value.width!;
    const progress = +(ratio * 100).toFixed(2);
    state.progress = progress;
    // 在这里更新当前时间
    state.currentTime = Math.floor(audioCtx.duration * ratio);
};

// 手指松开按照进度继续播放
const touchend = () => {
    const currentTime = audioCtx.duration * ratio;
    audioCtx.seek(currentTime);
    audioCtx.onTimeUpdate(updateProgress);
}; 

onMounted(() => {
    uni.createSelectorQuery().in(instance)
    .select('.track')
    .boundingClientRect((rectInfo) => {
        if (rectInfo) {
            rect.value = rectInfo;
        };
    }).exec();
});
</script>

<template>
    <view class="progress-bar">
        <text class="song-time">
            {{ numToDateFormat(state.currentTime) }}
        </text>
        <view 
            class="track-box"
            @touchstart="jumpProgress"
            @touchmove="touchmove"
            @touchend="touchend"
        >
            <view class="track">
                <!-- <view class="track-point"></view> -->
                <!-- <view 
                    class="track-point"
                ></view> -->
                <view 
                    class="track-line"
                    :style="{ width: state.progress+'%' }"
                ></view>
                <view 
                    class="track-current-point"
                    :class="{'track-point-hover': false}"
                    :style="{ left: state.progress+'%' }"
                ></view>
            </view>
        </view>
        <text class="song-time">
            {{ numToDateFormat(state.endTime) }}
        </text>
    </view>

</template>

<style lang='less'>
.progress-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20rpx;
    gap: 20rpx;
    color: #cccccc;
}
.song-time {
    width: 70rpx;
    text-align: center;
}
.track-box {
    width: 100%;
    display: flex;
    align-items: center;
    height: 20rpx
}
.track {
    position: relative;
    width: 100%;
    height: 4rpx;
    background-color: #666666;
}
.track-line {
    width: 0;
    height: 100%;
    background-color: #dddddd;
}
.track-point {
    position: absolute;
    top: 50%;
    width: 10rpx;
    height: 10rpx;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
}
.track-current-point {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10rpx;
    height: 10rpx;
    border-radius: 50%;
    transform: translateY(-50%);
    background-color: #ffffff;
}
.track-point-hover {
    width: 20rpx;
    height: 20rpx;
}
</style>
