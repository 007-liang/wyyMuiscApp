<script setup lang='ts'>
import { useMusicLibraryStore } from '@/store/store-music-library';
import { computed, onMounted, ref } from 'vue';
import Songlist from '@/pages/music-library/songs-lists.vue';

const store = useMusicLibraryStore();
const keyword = ref("");
const loading_flag = ref(false);
const musics = computed(() => {
    let text = keyword.value.trim()
    if (!text) {
        return [];
    };
    loading_flag.value = true;
    let result =  store.musics.filter((item) => {
        return item.name.toLocaleLowerCase().indexOf(
            text.toLocaleLowerCase()
        ) !== -1;
    });
    setTimeout(() => {
        loading_flag.value = false;
    }, 500);
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
            placeholder-style="color: rgba(255, 255, 255, .4);"
            v-model="keyword"
        />
    </view>
    <view
        class="music-library-search-container scrollbar-none"
    >
        <Songlist
            :musics="musics"
            :show-index="false"
            v-show="!loading_flag"
        />
        <loading
            v-show="loading_flag"
            styles="padding: 100rpx 0;"
        />
        <view
            v-show="keyword.trim() && musics.length === 0 && !loading_flag"
            class="music-library-search-not-fount"
            
        >
            未找到与 '{{keyword.trim()}}' 相匹配的歌曲
        </view>
    </view>
</template>

<style lang="less">
.music-library-search-not-fount {
    color: #999;
    padding: 100rpx;
    text-align: center;
}

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