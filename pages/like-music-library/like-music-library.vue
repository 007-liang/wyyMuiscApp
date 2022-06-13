<script setup lang='ts'>
import { 
    useLikeMusicLibraryStore, 
    useMusicLibraryStore,
} from "@/store";
import Header from "@/components/music-library/header.vue";
import Detail from "@/components/music-library/detail.vue";
import Tags from '@/components/music-library/tags.vue';
import Songs from '@/components/music-library/songs.vue';
import MusicLibraryMain from "@/components/music-library/music-library-main.vue";
// music-library-main
const likeLibrary = useLikeMusicLibraryStore();
likeLibrary.playlistStateSync();
</script>

<template>
    <MusicLibraryMain>
        <Header></Header>
        <Detail></Detail>
        <Tags></Tags>
        <Songs></Songs>
    </MusicLibraryMain>
</template>