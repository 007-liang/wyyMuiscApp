<script lang="ts">
import { 
    usePlayingSongStore, 
    useAudioStore
} from "@/store";
import { 
    getSongDetail, 
    getSongUrl 
} from "@/api";
import { watch } from 'vue-demi';
import handerVue from "./hander.vue";
import footerVue from "./footer.vue";
import lyricVue from "./lyric.vue";
import cdVue from "./cd.vue";

const { 
    playingSongState: state 
} = usePlayingSongStore();
const {
    audioCtx,
    playPause,
    updateProgress,
    switchState,
} = useAudioStore();

const setSongUrl = async (id: number) => {
    const { data } = await getSongUrl(id);
    if (data.code === 200) {
        const song = data.data[0];
        const aop = () => {
            if(state.playing) {
                state.playing = false;
            }
            playPause(true);
            audioCtx.offCanplay(aop);
        };
        audioCtx.src = song.url;
        audioCtx.onCanplay(aop);
    }
};

watch(
    () => state.id,
    async (id) => {
        // 获取歌曲地址
        if(id != null) {
            state.progress = 0;
            state.currentTime = 0;
            await setSongUrl(id);
        }
    }
);

export default {
    async onLoad(options) {
        let id = +options.id;
        if (id && state.id !== id) {
            state.id = id;
            const { data } = await getSongDetail(state.id);
            if (data.code === 200) {
                const { al, ar, dt } = data.songs[0];
                switchState({ id,  al, ar, dt, });
            }
        }
        if (state.timer === null) {
            state.timer = setInterval(updateProgress , 1000);
        }
    },
    setup() {
        return {
            state,
        }
    },
    components: {
        handerVue,
        footerVue,
        lyricVue,
        cdVue,
    },
    onUnload() {
        if (state.timer !== null) {
            clearInterval(state.timer);
            state.timer = null;
        }
    }
}
</script>

<template>
    <view 
        class="vague-backage" 
        :style="{ backgroundImage: `url(${ state.picUrl }?param=375y500)` }"
    >
        <view class="vague-backage-mask"></view>
    </view>
    <view class="song-detail">
        <handerVue></handerVue>
        <cdVue v-show="!state.showLyric"></cdVue>
        <lyricVue 
            v-show="state.showLyric"
        ></lyricVue>
        <footerVue></footerVue>
    </view>
</template>

<style lang='less'>
page {
    height: 100%;
}

.vague-backage {
    position: relative;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: all 0.5s linear;
}

.vague-backage-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(60rpx);
}

.song-detail {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 20rpx;
}
</style>
