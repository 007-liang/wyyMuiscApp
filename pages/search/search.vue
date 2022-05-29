<template>
	<view class="search-box">
        <text class="iconfont">&#xe68d;</text>
		<input type="text" placeholder="搜索内容" class="">
	</view>
	<history /> <!-- 历史搜索 -->
    <hot /> <!-- 热搜榜单 -->
    <music /> <!-- app 是音乐专区, api缺失改成推荐新音乐 -->
    <hotSings />
</template>

<script lang="ts" setup>
import history from "@/pages/search/history.vue";
import hot from "@/pages/search/hot.vue";
import music from "@/pages/search/music.vue";
import hotSings from "@/pages/search/hot-sings.vue";
</script>

<style scoped lang="less">
	.search-box {
		display: flex;
        align-items: center;
        column-gap: 20rpx;
        
        .iconfont {
            margin-left: 10rpx;
            font-size: 32rpx;
        }
	}

	input {
		padding: 20rpx;
		border-bottom: 2rpx solid #ddd;
		flex: 1;
        margin-right: 20rpx;
	}
</style>
