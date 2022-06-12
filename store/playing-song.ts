import { getSongUrl } from "@/api";
import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import { useAudioStore } from './audio';
import { usePlayingLibrary } from './playing-song-library';
/**
 * 当前歌曲播放状态
 */
export const playingSongState = reactive<IPlayingSong>({
    id: -1,
    endTime: 0,
    author: '',
    name: '',
    currentTime: 0,
    playing: false,
    progress: 0,
    picUrl: '/static/song_detali_background_image.jpg',
    showLyric: false,
    timer: null,
    lyric: {
        id: -1,
        data: [],
    },
});
export const usePlayingSongStore = defineStore('playing-song', () => {
    const state = playingSongState;

    const {
        audioCtx,
        switchState
    } = useAudioStore();
    const library = usePlayingLibrary();

    /**
     * 获取歌曲URL
     * @param id 歌曲ID
     */
    const setSongUrl = async (id: number) => {
        const { data } = await getSongUrl(id);
        if (data.code === 200) {
            const song = data.data[0];
            if (song.url) {
                audioCtx.src = song.url;
            } else { // 歌曲不存在切换下一首
                let index = library.index!;
                const { list } = library.state;
                library.setIndex(++index)
                switchState(list![index]);
            }
        }
    };
    
    watch( // 监听state的变化
        () => state.id,
        (id) => {
            // 获取歌曲地址
            if(id != null) {
                state.progress = 0;
                state.currentTime = 0;
                setSongUrl(id);
            }
        }
    );
    return {
        setSongUrl,
        playingSongState,
    };
});