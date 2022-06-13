import { 
    i,
    parseAuthors, 
    playStrategy 
} from "@/utils";
import { 
    playingSongState as state
} from "./playing-song";
import { 
    markRaw, 
    ref 
} from "vue";
import { defineStore } from "pinia";

export const audioCtx = markRaw(wx.createInnerAudioContext());
/**
 * 切换状态，id改变自动获取数据
 * @param param0 歌曲详情的数据
 */
export const switchState = (data: Partial<IMusicDetail>) => {
   playPause(false);
   const { al, ar, id, dt, name } = data
   state.progress = 0;
   state.currentTime = 0;
   state.id = id!;
   state.name = name!;
   state.endTime = Math.floor(dt! / 1000);
   state.author = `${parseAuthors(ar!)} - ${al!.name}`;
   wx.getImageInfo({ // 加载歌词封面
       src: al!.picUrl,
       success() {
           state.picUrl = al!.picUrl;
       }
   });
};
/**
 * 控制播放和暂停
 * @param isPlay 是否播放
 */
const playPause = (isPlay: boolean) => {
    if (isPlay) {
        audioCtx.play();
    } else {
        audioCtx.pause();
    }
    state.playing = isPlay;
};

export const useAudioStore = defineStore('audio-store', () => {
    /**
     * 更新进度条
     */
    const updateProgress = () => {        
        if (audioCtx.paused) return;
        state.currentTime = Math.floor(audioCtx.currentTime);
        let duration = audioCtx.duration;
        if (duration) {
            const ratio = state.currentTime / duration * 100;
            state.progress = +ratio.toFixed(2);
        }
    };
    
    audioCtx.onCanplay(() => {
        playPause(true);
    });

    audioCtx.onEnded(() => {
        playStrategy[i.value]();
    });

    audioCtx.onSeeked(() =>{
        audioCtx.pause();
        audioCtx.play();
    });
    
    // audioCtx.loop = true;
    audioCtx.onTimeUpdate(updateProgress);

    return {
        audioCtx,
        switchState,
        playPause,
        updateProgress,
    };
});
