<script lang='ts' setup>
import { 
    onMounted, 
    ref 
} from 'vue';
import { useAudioStore } from '@/store';
import { getCurrentInstance } from 'vue-demi';
const instance = getCurrentInstance();
const rect = ref({} as UniApp.NodeInfo);
const { audioCtx } = useAudioStore();
const offset = ref(audioCtx.volume * 100);
const setVolume = (e: any) => {
    const { offsetLeft } = e.currentTarget;
    const [{ pageX }] = e.touches;
    const position = pageX - offsetLeft;
    if (rect.value.width) {
        const ratio = +(position / rect.value.width).toFixed(2);
        audioCtx.volume = ratio;
        offset.value = ratio * 100;
    }
};
const touchMove = (e) => {
    const { offsetLeft } = e.currentTarget;
    const [{ pageX }] = e.touches;
    const position = pageX - offsetLeft;
    if (rect.value.width) {
        const ratio = +(position / rect.value.width).toFixed(2);
        if (ratio > 1 || ratio < 0) return;
        audioCtx.volume = ratio;
        offset.value = ratio * 100;
    }
};
onMounted(() => {
    uni.createSelectorQuery()
    .in(instance)
    .select('.voice-contaier')
    .boundingClientRect((rectInfo) => {
        rect.value = rectInfo;
    }).exec();
});
</script>

<template>
    <view class="voice">
        <text class="iconfont">&#xe69f;</text>
        <view 
            class="voice-contaier"
            @touchstart="setVolume"
            @touchmove="touchMove"
            :hover-stop-propagation="true"
        >
            <view class="voice-tarck">
                <view 
                    class="voice-line"
                    :style="{width: offset+'%'}"
                ></view>
                <view 
                    class="current-voice"
                    :style="{left: offset+'%'}"
                ></view>
            </view>
        </view>
        <text class="iconfont"> </text>
    </view>
</template>

<style lang='less'>
.voice {
    padding-top: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20rpx;

    > .iconfont {
        width: 40rpx;
        color: #999999;
        font-size: 34rpx;
    }
}

.voice-contaier {
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    height: 20rpx;
}

.voice-tarck {
    flex: 1;
    height: 4rpx;
    background-color: #666666;
}

.voice-line {
    width: 0%;
    height: 4rpx;
    background-color: #ffffff;
}

.current-voice {
    position: absolute;
    width: 10rpx;
    height: 10rpx;
    top: 50%;
    background-color: #ffffff;
    border-radius: 50%;
    transform: translate(-100%, -50%);
}
</style>
