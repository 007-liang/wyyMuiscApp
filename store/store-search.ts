import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";

import {
	getLocalStorage,
    search_history_localstorage,
    setLocalStorage,
} from "@/utils";

export const useSearchStore = defineStore("search", () => {
    const search_keyword = ref("");
    const history = ref(getLocalStorage(search_history_localstorage) || [
        "So Far Away",
        "孤勇者",
        "反方向的钟",
        "C"
    ]) as Ref<string[]>;
    const input_keyword = (keyword: string) => {
        search_keyword.value = keyword;
    }
    return {
        search_keyword,
        history,
        input_keyword
    }
});