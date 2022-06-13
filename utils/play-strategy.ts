import {
    setStateIndex
} from "@/utils"
import {
    state,
    index,
    audioCtx,
    switchState,
} from '@/store';
import { ref } from "vue";

const playMode = [
    '&#xe66e;',
    '&#xe60a;',
    '&#xe71f;',
];

export const i = ref(0);
export const currentMode  = ref(playMode[i.value]);
export const changeMode = () => {
    i.value < 2 ? ++i.value : i.value = 0;
    i.value === 0 
        ? audioCtx.loop = true
        : audioCtx.loop = false;
    currentMode.value = playMode[i.value];
};

const loop = () => {
    audioCtx.loop = true;
    audioCtx.play();
};

const loopList = () => {
    setStateIndex(index.value!, state.list!.length, true);
    switchState(state.list![index.value!]);
};

const random = () => {
    let max = state.list!.length - 1;
    let currentIndex = Math.floor(Math.min(Math.random() * max, max -1));
    setStateIndex(currentIndex, max, true);
    switchState(state.list![index.value!]);
};

/**
 * 播放策划
 * 0 = loop
 * 1 = loopList
 * 2 = random
 */
export const playStrategy = [
    loop,
    loopList,
    random,
];