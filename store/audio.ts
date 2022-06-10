import { parseAuthors } from "@/utils";
import { defineStore } from "pinia";
import { markRaw } from "vue";
import { 
    playingSongState as state
} from "./playing-song";

export const useAudioStore = defineStore('audio-store', () => {
    const audioCtx = markRaw(wx.createInnerAudioContext());
    
    /**
     * 控制播放和暂停
     * @param isPlay 是否播放
     */
    const playPause = (isPlay: boolean) => {
        if (isPlay) {
            audioCtx.play();
            if (state.timer === null) {
                state.timer = setInterval(updateProgress, 1000);
            }
        } else {
            clearInterval(state.timer);
            state.timer = null;
            audioCtx.pause();
        }
        state.playing = isPlay;
    };

    /**
     * 更新进度条
     */
    const updateProgress = () => {
        state.currentTime = Math.floor(audioCtx.currentTime);
        let duration = audioCtx.duration;
        if (duration) {
            const ratio = state.currentTime / duration * 100;
            state.progress = +ratio.toFixed(2);
        }
    };

    /**
     * 切换状态，id改变自动获取数据
     * @param param0 歌曲详情的数据
     */
    const switchState = (data: Partial<IMusicDetail>) => {
        const { al, ar, id, dt } = data
        state.id = id!;
        state.name = al!.name;
        state.picUrl = al!.picUrl;
        state.endTime = Math.floor(dt! / 1000);
        state.author = parseAuthors(ar!);
    };

    audioCtx.onEnded(() => {
        playPause(false);
        updateProgress();
    });

    return {
        audioCtx,
        switchState,
        playPause,
        updateProgress
    };
});
