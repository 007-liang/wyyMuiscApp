<script setup lang='ts'>
import Header from "./components/list-header.vue";
import { to_music_library, wxRequest } from '@/utils';
import { ref } from 'vue';

let new_songs = ref<IIndexNewSongsResult[]>([]);

const get_new_songs = async () => {
    let res = await wxRequest<IIndexNewSongs>({
        url: "/personalized",
        data: {
            limit: 6
        }
    });
    new_songs.value = res.data.result;
};
get_new_songs();

</script>

<template>
    <view class="section">
        <Header title="推荐歌单" />
        <view class="news-songs-container">
            <songSheetCard 
                v-for="item in new_songs" 
                :key="item.id"
                :sid="item.id"
                :picUrl="item.picUrl"
                :playCount="item.playCount"
                :name="item.name"
                @click="to_music_library(item.id)"
            ></songSheetCard>
        </view>
    </view>
</template>

<style lang="less">
.news-songs-container {
    display: flex;
    box-sizing: border-box;
    overflow-x: scroll;
    column-gap: 20rpx;
    &::-webkit-scrollbar {
        display: none;
    }
}
</style>