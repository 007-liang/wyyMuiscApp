import { getLocalStorage } from "@/utils";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useHistoryLibrary = defineStore('history-library', () => {
    let list = getLocalStorage('history-list') || [];
    const historyList = reactive(list as IMusicDetail[]);
    const updateHistory = (data: IMusicDetail) => {
        let hasId = historyList.some((item) => (
            item.id === data.id
        ));
        if (!hasId) {
            historyList.unshift(data);
            if (historyList.length > 100) {
                historyList.length = 100;
            }
        }
    };
    return {
        historyList,
        updateHistory,
    }
});