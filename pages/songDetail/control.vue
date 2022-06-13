<script setup lang='ts'>
import { 
    useAudioStore, 
    usePlayingLibrary, 
    usePlayingSongStore
} from '@/store';
import { 
    changeMode,
    currentMode,
    debounce, 
    i, 
    playStrategy, 
    setStateIndex 
} from '@/utils';

const {
    playingSongState: state,
} = usePlayingSongStore();
const store = usePlayingLibrary();
const {
    playPause,
    switchState,
} = useAudioStore();

// 切换歌曲
const switchSong = (next: boolean) => {
    if (i.value !== 2) {
        const list = store.state.list;
        const index = store.index;
        if (list && index !== null) {
            setStateIndex(index, list.length - 1, next);
            switchState(list[store.index!]);
        }
    } else {
        playStrategy[i.value]();
    }
};

const proxyFn = debounce(switchSong, 500, true);
</script>

<template>
    <view class="control">
        <view 
            class="iconfont"
            v-html="currentMode"
            @click="changeMode"
        ></view>
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
</template>

<style lang='less'>
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
