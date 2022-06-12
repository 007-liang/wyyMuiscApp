<script lang="ts">
import { 
    usePlayingSongStore, 
    useAudioStore
} from "@/store";
import { 
    getSongDetail, 
} from "@/api";
import handerVue from "./hander.vue";
import footerVue from "./footer.vue";
import lyricVue from "./lyric.vue";
import cdVue from "./cd.vue";

const { 
    playingSongState: state,
} = usePlayingSongStore();
const {
    switchState,
} = useAudioStore();

export default {
    async onLoad(options) {
        let id = +options.id; 
        if (state.id !== id) {
            state.id = id;
            const { data } = await getSongDetail(state.id);
            if (data.code === 200) {
                const { al, ar, dt, name } = data.songs[0];
                switchState({ id, name,  al, ar, dt, });
            }
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
}
</script>

<template>
    <view 
        class="vague-backage" 
        :style="{ backgroundImage: `url(${ state.picUrl })` }"
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
    background-color: #999999;
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
