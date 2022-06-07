<script setup lang='ts'>
import handerVue from "./hander.vue";
import footerVue from "./footer.vue";
import lyricVue from "./lyric.vue";
import cdVue from "./cd.vue";
</script>

<script lang="ts">
import { 
    usePlayingSongStore, 
    audioCtx 
} from "@/store";
import { 
    getSongDetail, 
    getSongUrl 
} from "@/api";
import { parseAuthors } from '@/utils';

const { state } = usePlayingSongStore();
const playSong = async (id: number) => {
    const { data } = await getSongUrl(id);
    const song = data.data[0];
    audioCtx.src = song.url;
};
export default {
    async onLoad(options) {
        state.id = options.id || 33894312;
        await playSong(options.id);
        const { data } = await getSongDetail(state.id);
        if (data.code === 200) {
            const song = data.songs[0];
            state.author = parseAuthors(song.ar);
            state.picUrl = song.al.picUrl;
            state.name = song.name;
            state.endTime = Math.floor(song.dt / 1000);
        }
    },
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
        <lyricVue v-show="state.showLyric"></lyricVue>
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
    transition: background-image .5s linear;
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
