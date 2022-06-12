<script setup lang='ts'>
import { 
    useAudioStore,
    usePlayingLibrary,
    usePlayingSongStore,
} from "@/store";
import { 
debounce,
    numToDateFormat, setStateIndex 
} from "@/utils";
import { 
    getCurrentInstance, 
    onMounted, 
    ref 
} from "vue";


let ratio = 0;
const like = ref();
const rect = ref({} as UniApp.NodeInfo);
const instance = getCurrentInstance();
const store = usePlayingLibrary();
const {
    playingSongState: state,
} = usePlayingSongStore();
const {
    audioCtx,
    playPause,
    switchState,
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

// 播放上一首
const switchSong = (next: boolean) => {
    const list = store.state.list;
    const index = store.index;
    if (list && index !== null) {
        setStateIndex(index, list.length - 1, next);
        switchState(list[store.index!]);
    }
};

const proxyFn = debounce(switchSong, 500, true);

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
    <view class="footer">
        <text class="tips-vip">
            正在试听，
            <text style="color: red">
                VIP仅0.29元/天，畅听完整版
                <view class="iconfont">&#xe66b;</view>
            </text>
        </text>
        <view class="icons">
            <text v-if="!like" class="iconfont">&#xe7df;</text>
            <text v-else class="iconfont">&#xe849;</text>
            <text class="iconfont">&#xe693;</text>
            <text class="iconfont">&#xe7f5;</text>
        </view>
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
        <view class="control">
            <view 
                class="iconfont"
            >&#xe60a;</view>
            <view 
                class="iconfont"
                @click="proxyFn(false)"
            >&#xe8f4;</view>
            <view 
                class="iconfont play-pause"
                @click="playPause(!state.playing)"
            >
                <text 
                    v-if="!state.playing" 
                    class="iconfont"
                >&#xe8ee;</text>
                <text 
                    v-else
                    class="iconfont"
                >&#xe7fe;</text>
            </view>
            <view 
                class="iconfont"
                @click="proxyFn(true)"
            >&#xe8f5;</view>
            <view 
                class="iconfont"
            >&#xe7f3;</view>
        </view>
    </view>
</template>

<style lang='less'>
.footer {
    box-sizing: border-box;
    position: fixed;
    padding: 30rpx;
    width: 100%;
    bottom: 0;
    left: 0;
    text-align: center;
}
.tips-vip {
    padding: 10rpx 20rpx;
    color: #ffffff;
    border-radius: 20px;
    background-color: #000000;
    font-size: 18rpx;
}
.icons {
    padding: 30rpx 0;
    display: flex;
    justify-content: center;
    gap: 50rpx;
    color: #cccccc;
}
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
.control {
    display: flex;
    padding: 30rpx 0;
    justify-content: center;
    color: #ffffff;
    gap: 50rpx;
    > .iconfont {
        align-self: center;
        font-size: 30rpx;
    }
}
.play-pause {
    padding: 10rpx;
    border: 2rpx solid #ffffff;
    border-radius: 50%;
    & .iconfont {
        font-size: 40rpx;
    }
}
</style>
