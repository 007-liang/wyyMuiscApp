<script lang='ts'>
import { useMusicLibraryStore } from '@/store/store-music-library';
import { defineComponent } from 'vue';
import Header from "@/components/music-library/header.vue";
import Detail from "@/components/music-library/detail.vue";
import Tags from '@/components/music-library/tags.vue';
import Songs from '@/components/music-library/songs.vue';
import MusicLibraryMain from '@/components/music-library/music-library-main.vue';

export default defineComponent({
    components: {
        Header,
        Detail,
        Tags,
        Songs,
        MusicLibraryMain
    },
    setup() {
        let store = useMusicLibraryStore();
        return {
            store,
            get_playlist: store.get_playlist,
        };
    },
    async onLoad(options: { id: string }) {
        this.get_playlist(options.id);
    },
});
</script>

<template>
    <MusicLibraryMain>  
        <Detail />
        <Tags />
        <Songs />
    </MusicLibraryMain>
</template>