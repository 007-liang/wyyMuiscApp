import { getSongDetail } from "@/api";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { usePlayingLibrary } from ".";
import { useMusicLibraryStore } from "./store-music-library";
import { useUserInfo } from "./store-user-info";

export const useLikeMusicLibraryStore = defineStore('like-music-library', () => {
    const userInfoStore = useUserInfo();
    const libraryStore = useMusicLibraryStore();
    const playingLibraryStore = usePlayingLibrary();
    const likeMusicIds = reactive([] as number[]);
    const likeLibrary = reactive([] as ISongDetail[]);
    const firstLikeMusicInfo = reactive<Partial<ISongDetail>>({});

    /**
     * 获取所有音乐id的详情
     * @param ids 一个id数组
     */
    const pushLikeMusicId = async (ids: number[]) => {
        likeMusicIds.push(...ids);
        const { data } = await getSongDetail(ids);
        if (data.code === 200) {
            const { state } = playingLibraryStore;
            state.id = -11;
            state.list = data.songs;
            likeLibrary.unshift(...data.songs);
            setFirstLikeMusicInfo(data.songs[0]);
            playlistStateSync();
        }
    };

    /**
     * 同步状态到播放列表
     */
    const playlistStateSync = () => {
        const { profile } = userInfoStore.userInfo;
        const { playlist } = libraryStore;
        libraryStore.musics = likeLibrary;
        libraryStore.loading = false;
        playlist.name = '我喜欢的音乐';
        playlist.description =  '我喜欢的音乐';
        playlist.coverImgUrl = firstLikeMusicInfo.al?.picUrl;
        playlist.creator!.avatarUrl = profile!.avatarUrl;
        playlist.creator!.nickname = profile!.nickname;
    };

    const setFirstLikeMusicInfo = (data: ISongDetail) => {
        Object.assign(firstLikeMusicInfo, data);
    };

    return {
        likeMusicIds,
        likeLibrary,
        firstLikeMusicInfo,
        pushLikeMusicId,
        playlistStateSync
    };
});