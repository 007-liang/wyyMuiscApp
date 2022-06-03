<script setup lang='ts'>
import Header from "./components/list-header.vue";
<<<<<<< HEAD
import {
    wxRequest,
    transform_num_unit,
    to_music_library,
} from '@/utils';
=======
import { wxRequest } from '@/utils';
>>>>>>> d97e9b43cca36d90da432a16aabd80b7f50cdc62
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
<<<<<<< HEAD
                @click="to_music_library(item.id)"
            >
                <image
                    class="news-songs-pic"
                    mode="widthFix"
                    :src="item.picUrl + '?param=160y160'"
                />
                <view class="playCount">
                    <text class="iconfont">
                        &#xe75d;
                    </text>
                    {{transform_num_unit(item.playCount)}}
                </view>
                <view class="news-song-name">
                    {{item.name}}
                </view>
            </view>
=======
                :sid="item.id"
                :picUrl="item.picUrl"
                :playCount="item.playCount"
                :name="item.name"
            ></songSheetCard>
>>>>>>> d97e9b43cca36d90da432a16aabd80b7f50cdc62
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