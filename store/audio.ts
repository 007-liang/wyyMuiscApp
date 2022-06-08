import { state } from "./playingSong";

/**
 * 音频上下文
 */
export const audioCtx = wx.createInnerAudioContext();
/**
 * 控制播放和暂停
 * @param isPlay 是否播放
 */
export const playPause = (isPlay: boolean) => {
    if (isPlay) {
        audioCtx.play();
        state.timer = setInterval(updateProgress, 1000);
    } else {
        clearInterval(state.timer);
        audioCtx.pause();
    }
    state.playing = isPlay;
};
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
audioCtx.onEnded(() => {
    playPause(false);
    updateProgress();
});