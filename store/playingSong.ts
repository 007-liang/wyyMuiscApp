import { defineStore } from "pinia";
import { reactive } from "vue";
/**
 * 当前歌曲播放状态
 */
export const state = reactive<IPlayingSong>({
    id: -1,
    endTime: 0,
    author: '',
    name: '',
    currentTime: 0,
    playing: false,
    progress: 0,
    picUrl: '/static/song_detali_background_image.jpg',
    showLyric: true,
    timer: null,
});
export const usePlayingSongStore = defineStore('playing-song', () => {
    return {
        state,
    };
});