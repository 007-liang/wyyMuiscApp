<script setup lang='ts'>
import { 
    useHistoryLibrary,
    usePlayingLibrary,
    useMusicLibraryStore
} from '@/store'
import { get_song_ar } from "@/utils";

<<<<<<< HEAD
const props = defineProps<{
    musics: IMusicDetail[];
}>();
const {
    updateHistory,
} = useHistoryLibrary();
const playingStore = usePlayingLibrary();
const libraryStore = useMusicLibraryStore();
const beforePlaySong = (
    musics: IMusicDetail, 
    key: number
) => {
    let {
        state,
        setIndex,
        setPlayingLibrary,
    } = playingStore;
    let playlist = libraryStore.playlist;
    setIndex(key);
    updateHistory(musics);
    if (state.id !== playlist.id) {
        setPlayingLibrary({
            id: playlist.id!,
            list: props.musics
        });
    }
};
=======
const props = withDefaults(
    defineProps<{
        musics: IMusicDetail[],
        showIndex?: boolean
    }>(),
    {
        showIndex: true
    }
);
>>>>>>> 1a0ac77e42b6c066ca79ac2e572eb36f2e909e1d
</script>

<template>
    <navigator
        v-for="(item, index) in props.musics"
        :key="item.id"
        :url="`/pages/songDetail/songDetail?id=${item.id}`"
        @click="beforePlaySong(item, index)"
        open-type="navigate"
        hover-class="none"
        class="music-library-song"
    >
        <view class="music-library-song-index" v-if="props.showIndex">
            {{index + 1}}
        </view>
        <view class="music-library-song-detail">
            <view class="music-library-song-name text-hidden">
                {{item.name}}
            </view>
            <view class="text-hidden">
                <tagVip v-if="item.fee === 1" />
                <tagSq v-if="item.sq" />

                {{get_song_ar(item).join("/")}}
                -
                {{item.al.name}}
            </view>
        </view>
        <view class="iconfont" v-if="item.mv !== 0">
            &#xe602;
        </view>
        <view class="iconfont">
            &#xe67a;
        </view>
    </navigator>
</template>

<style lang="less" scoped>
.music-library-song {
    display: flex;
    column-gap: 40rpx;
    align-items: center;
    padding: 20rpx 40rpx;
}
.music-library-song-index {
    color: #999;
    font-size: 38rpx;
    width: 60rpx;
    text-align: center;
}

.music-library-song-detail {
    flex: 1;
    // width: 520rpx;
    overflow: hidden;
}

.music-library-song-name {
    margin-bottom: 10rpx;
    font-size: 34rpx;
}

.iconfont {
    font-size: 50rpx;
    color: #999
}
</style>