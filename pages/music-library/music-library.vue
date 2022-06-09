<script lang='ts'>
import { useMusicLibraryStore } from '@/store/store-music-library';
import {
    defineComponent,
    onBeforeUnmount
} from 'vue';
import Header from "./header.vue";
import Detail from "./detail.vue";
import Tags from './tags.vue';
import Songs from './songs.vue';

export default defineComponent({
    components: {
        Header,
        Detail,
        Tags,
        Songs
    },
    setup() {
        let store = useMusicLibraryStore();
        let {
            trigger_page_scroll,
        } = store;
        onBeforeUnmount(() => {
            store.reset();
        })
        return {
            store,
            get_playlist: store.get_playlist,
            trigger_page_scroll
        };
    },
    methods: {
        scroll(e: any) {
            this.trigger_page_scroll(e.target.scrollTop);
        }
    },
    async onLoad(options: { id: string }) {
        this.get_playlist(options.id);
    },

    // onPageScroll(scrollTop: number) {
    // }
});
</script>

<template>
    <view class="music-library-filter"></view>
    <image
        mode="widthFix"
        class="music-library-bg"
        :src="store.playlist.coverImgUrl"
    ></image>
    <Header />
    <scroll-view
        class="container"
        @scroll="scroll"
        :scroll-y="true"
        :show-scrollbar="false"
        :enhanced="true"
    >
        <Detail />
        <Tags />
        <Songs />
    </scroll-view>
</template>

<style lang="less">
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