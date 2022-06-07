import { effect } from "vue";
import { state } from "./playingSong";

/**
 * 音频上下文
 */
export const audioCtx = wx.createInnerAudioContext();

effect(() => {
    if (state.playing) {
        audioCtx.play();
        state.timer = setInterval(updateProgress, 1000);
    } else {
        clearInterval(state.timer);
        audioCtx.pause();
    }
});
/**
 * 更新进度条
 */
export const updateProgress = () => {
    state.currentTime = Math.floor(audioCtx.currentTime);
    let duration = audioCtx.duration;
    if (duration) {
        const ratio = state.currentTime / duration * 100;
        state.progress = +ratio.toFixed(2);
    }
};
audioCtx.onCanplay(() => {
    state.playing = true;
});
audioCtx.onEnded(() => {
    state.playing = false;
    updateProgress();
});