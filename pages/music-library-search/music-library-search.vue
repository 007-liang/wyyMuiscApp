<script setup lang='ts'>
import { useMusicLibraryStore } from '@/store/store-music-library';
import { computed, onMounted, ref } from 'vue';
import Songlist from '@/pages/music-library/songs-lists.vue';

const store = useMusicLibraryStore();
const keyword = ref("");

const musics = computed(() => {
    let text = keyword.value.trim()
    if (!text) {
        return [];
    };
    let result =  store.musics.filter((item) => {
        return item.name.toLocaleLowerCase().indexOf(
            text.toLocaleLowerCase()
        ) !== -1;
    });
    return result;
});

onMounted(() => {
    if (store.musics.length == 0) {
        wx.navigateBack(1);
    };
});
</script>

<template>
    <view class="music-library-filter"></view>
    <image
        mode="widthFix"
        class="music-library-bg"
        :src="store.playlist.coverImgUrl"
    ></image>
    <view class="music-library-search-header">
        <input
            class="music-library-search-control"
            placeholder="搜索歌单内歌曲"
            placeholder-style="color: #fff;"
            v-model="keyword"
        />
    </view>
    <view
        class="music-library-search-container scrollbar-none"
    >
        <Songlist :musics="musics" />
    </view>
</template>

<style lang="less">
.music-library-search-container {
    flex: 1;
    background-color: #fff;
    overflow-y: scroll;
}
.music-library-search-header {
    padding: 20rpx;
    
    .music-library-search-control {
        padding: 20rpx 0;
        font-size: 38rpx;
        color: #fff;
        border-bottom: 2rpx solid #fff;
    }
}
page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
}
</style>