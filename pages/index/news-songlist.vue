<script setup lang='ts'>
import Header from "./components/list-header.vue";
import {
    wxRequest,
    transform_num_unit,
    to_music_library,
} from '@/utils';
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
            <view
                class="news-songs"
                v-for="item in new_songs"
                :key="item.id"
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
    
    .news-songs-pic {
        width: 260rpx !important;
        border-radius: 20rpx;
    }
}
.news-songs {
    position: relative;
}
.playCount {
    position: absolute;
    right: 10rpx;
    top: 10rpx;
    color: #fff;
    background-color: rgba(0, 0, 0, .4);
    padding: 10rpx;
    border-radius: 30rpx;
    
    .iconfont {
        font-size: 34rpx;
    }
}
.news-song-name {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

</style>