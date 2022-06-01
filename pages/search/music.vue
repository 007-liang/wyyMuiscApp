<template>
    <view
        class="search-songsbox"
    >
        <view class="search-songsbox-title">最新单曲</view>

        <view class="search-news-songs">
            <view
                class="search-news-song"
                v-for="item in musics"
                :key="item.id"
            >
                <image
                    :src="item.picUrl + '?param=80y80'"
                    class="search-song-pic"
                    mode="widthFix"
                />
                <view class="search-song-detail">
                    <view
                        class="search-song-detail-title"
                    >
                        {{item.name}}
                    </view>
                    <view class="search-song-detail-subtitle">
                        专辑: {{item.song.album.name}}
                    </view>
                    <view class="search-song-sings">
                        歌手
                        <text
                            v-for="item in item.song.artists"
                            :key="item.id"
                        >
                            {{item.name}}
                        </text>
                    </view>
                </view>
            </view>
        </view>

        <view class="search-more-news-songs">
            查看更多单曲
            <text class="iconfont">&#xe66b;</text>
        </view>
    </view>
</template>

<script lang='ts'>
import { wxRequest } from '@/utils'
import { defineComponent } from 'vue'
export default defineComponent({
    data() {
        return {
            musics: [] as INewsMusicData[],
        }
    },
    async created() {
        let res = await wxRequest<INewsMusic>({
            url: "/personalized/newsong",
            data: {
                limit: 5
            }
        });
        this.musics = res.data.result;
        // console.log(this.musics);
        
    },
    methods: {

    },
})
</script>

<style lang="less">
.search-songsbox {
    padding: 0 48rpx;
}
.search-songsbox-title {
    font-weight: bold;
}
.search-song-pic {
    width: 172rpx;
    border-radius: 20rpx;
}
.search-news-song {
    display: flex;
    column-gap: 20rpx;
    margin-top: 20rpx;
}
.search-song-detail {
    flex: 1;
    overflow: hidden;
}
.search-song-detail-subtitle {
    color: #999;
}
.search-song-detail-title {
    padding: 12rpx 0;
}
.search-song-detail-subtitle,
.search-song-detail-title,
.search-song-sings {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.search-song-sings {
    margin-top: 12rpx;
}
.search-more-news-songs {
    width: 100%;
    text-align: center;
    padding: 40rpx;
    box-sizing: border-box;

    .iconfont {
        font-size: 32rpx;
    }
}
</style>