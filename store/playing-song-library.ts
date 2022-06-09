import { 
    ref,
    reactive
} from "vue";
import { defineStore } from "pinia";


const state = reactive<Partial<IPlayingLibrary>>({})
const index = ref<number | null>(null);

 // 设置列表播放的索引
export const setIndex = (key?: number) => {
    if (key !== undefined) {
        index.value = key;
    } else {
        index.value = null;
    }
};
export const usePlayingLibrary =  defineStore('playing-song-library', () => {
    // 设置当前播放的列表
    const setPlayingLibrary = (
        library?: IPlayingLibrary,
    ) => {
        if (library) {
            state.id = library.id;
            state.list = library.list;
        } else {
            state.id = undefined;
            state.list = [];
        }
    };
    return {
        state,
        index,
        setIndex,
        setPlayingLibrary
    }
});