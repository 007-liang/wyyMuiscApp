import { wxRequest } from "@/utils";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMusicLibraryStore = defineStore("music_library", () => {
    const playlist = ref<Partial<IMusiceLibraryRes["playlist"]>>({
        creator: {
            nickname: "",
            avatarUrl: "",
        }
    });
    const loading = ref(true);
    const musics = ref<IMusicDetail[]>([]);
    const get_musics = async () => {
        let res = await wxRequest<IMusicLibraryAllRes>({
            url: "/playlist/track/all",
            data: {
                id: playlist.value.id
            }
        });
        
        musics.value = res.data.songs
        setTimeout(() => {
            loading.value = false;
        }, 500);
    }
    const get_playlist = async (id: string) => {
        loading.value = true;
        let res = await wxRequest<IMusiceLibraryRes>({
            url: "/playlist/detail",
            data: {
                id
            }
        });
        
        playlist.value = res.data.playlist;
        musics.value = playlist.value.tracks!;
        get_musics();
    }
    
    const scroll_event_ponds = new Set<(scrollTop: number) => void>();
    const listener_page_scroll = (fn: (scrollTop: number) => void) => {
        scroll_event_ponds.add(fn);
    };
    const trigger_page_scroll = (scrollTop: number) => {
        scroll_event_ponds.forEach(fn => fn(scrollTop))
    }

    const reset = () => {
        playlist.value = {
            creator: {
                nickname: "",
                avatarUrl: "",
            }
        };
        musics.value = [];
    }

    return {
        loading,
        playlist,
        musics,
        get_playlist,

        // 监听页面滚动
        listener_page_scroll,
        trigger_page_scroll,

        reset,
    }
});