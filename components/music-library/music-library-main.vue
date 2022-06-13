<script setup lang='ts'>
import { useMusicLibraryStore } from '@/store';
import { onBeforeUnmount } from 'vue';
import Header from './header.vue';

const store = useMusicLibraryStore();
const {
    trigger_page_scroll,
} = store;
const scroll = (e: any) => {
    trigger_page_scroll(e.target.scrollTop);
}

onBeforeUnmount(() => {
    store.reset();
})
</script>

<template>
    <view class="music-library-filter"></view>
        <image
            mode="widthFix"
            class="music-library-bg"
            :src="store.playlist.coverImgUrl"
        ></image>
        <Header/>
        <scroll-view
            class="container"
            @scroll="scroll"
            :scroll-y="true"
            :show-scrollbar="false"
            :enhanced="true"
        >
        <slot></slot>
    </scroll-view>
</template>

<style lang='less'>
.container {
    flex: 1;
    overflow-y: scroll;
}

page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: transparent;
}
</style>
