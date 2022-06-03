<template>
    <!-- <view class="home"> -->
        <view class="index-header">
            <view
                class="search-box"
                @click="to_search_page"
            >
                <input
                    type="text"
                    class="search-control"
                    placeholder="请输入搜索内容"
                >
                <text class="search-icon iconfont">
                    &#xe684;
                </text>
            </view>
        </view>
        <view class="content">
            <banner />
            <category />
            <news-songlist />
            <exclusive-broadcast />
            <!-- <recommend /> -->
        </view>
    <!-- </view> -->
</template>

<script setup lang="ts">
import category from "./category.vue"; // 轮播图下面的类别
import newsSonglist from "./news-songlist.vue"; // 推荐歌单
import banner from "./banner.vue"; // 轮播图
import exclusiveBroadcast from "./exclusive-broadcast.vue"; // 独家放送
// import recommend from "./recommend.vue";
import { onMounted } from "vue";
import { to_music_library } from "@/utils";
const to_search_page = () => {
    wx.navigateTo({
        url: '/pages/search/search'
    })
}
onMounted(() => {
    to_music_library("2746032864");
})
</script>

<style lang="less">
.index-header {
    background-color: #fff;
    .search-box {
        position: relative;
        margin: 20rpx;
        .search-icon {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 32rpx;
            font-size: 34rpx;
        }
    }
    .search-control {
        padding: 20rpx;
        padding-left: 72rpx;
        border: 2rpx solid #999;
        border-radius: 40rpx;
    }
}
.section {
    padding: 40rpx;
    border-radius: 20rpx;
}
.content {
	flex: 1;
    overflow-y: scroll;
    padding-bottom: 120rpx;
}
page {
    background-color: #f2f2f2;
    display: flex;
    flex-direction: column;
    height: 100vh;
}
</style>
