<script lang="ts" setup>
import history from "@/pages/search/history.vue";
import hot from "@/pages/search/hot.vue";
import music from "@/pages/search/music.vue";
import hotSings from "@/pages/search/hot-sings.vue";
import searchList from "@/pages/search/search-list.vue";
import searchDetail from "@/pages/search/search-detail.vue";
import { useSearchStore } from "@/store";
const searchStore = useSearchStore();
</script>

<template>
	<view class="search-box">
        <text class="iconfont back">&#xe68d;</text>
		<input
            type="text"
            placeholder="搜索内容"
            class=""
            v-model="searchStore.search_keyword"
            @blur="searchStore.search_control_blur"
            @focus="searchStore.search_control_focus"
        >
        <text
            v-show="searchStore.search_keyword.trim()"
            class="iconfont search-clear-keyword"
            @click="searchStore.clear_keyword"
        >
            &#xe668;
        </text>
	</view>
    <view class="search-container">
        <view v-show="!searchStore.search_keyword.trim()">
            <history /> <!-- 历史搜索 -->
            <hot /> <!-- 热搜榜单 -->
            <music /> <!-- app 是音乐专区, api缺失改成推荐新音乐 -->
            <hotSings /> 
        </view>
        <searchList
            v-show="
                searchStore.search_control_focus_flag && 
                searchStore.search_keyword.trim()
            "
        />
        <searchDetail
            v-if="searchStore.search_keyword.trim() && 
            !searchStore.search_control_focus_flag"
        />
    </view>
</template>


<style lang="less">
page {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.search-container {
    flex: 1;
    overflow-y: scroll;
}
.search-box {
    display: flex;
    align-items: center;
    column-gap: 20rpx;
    position: relative;
    // position: fixed;
    // top: 0;
    // left: 0;
    // width: 100%;
    // background-color: #fff;
    
    .back {
        margin-left: 10rpx;
        font-size: 32rpx;
    }
}

.search-clear-keyword {
    position: absolute;
    right: 40rpx;
    transform: translateY(-50%);
    top: 50%;
    font-size: 36rpx;
}

input {
    padding: 20rpx;
    padding-right: 80rpx;
    border-bottom: 2rpx solid #ddd;
    flex: 1;
    margin-right: 20rpx;
}
</style>
