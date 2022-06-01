<template>
    <header class="index-header">
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
    </header>
	<view class="content">
        <banner />
        <news-songlist />
	</view>
</template>

<script setup lang="ts">
import newsSonglist from "./news-songlist.vue";
import banner from "./banner.vue";
const to_search_page = () => {
    wx.navigateTo({
        url: '/pages/search/search'
    })
}
</script>

<style lang="less">
.index-header {
    background-color: #fff;
}
page {
    background-color: #f2f2f2;
}
.section {
    padding: 40rpx;
    border-radius: 20rpx;
}
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
.content {
	flex: 1;
    overflow-y: scroll;
}
page {
    display: flex;
    flex-direction: column;
}
</style>
