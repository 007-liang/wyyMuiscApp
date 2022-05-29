<script lang="ts" setup>
import {
	getLocalStorage,
    search_history_localstorage,
    setLocalStorage,
} from "@/utils";
import { ref } from "vue";
import type { Ref } from "vue";
const history = ref(getLocalStorage(search_history_localstorage) || [
    "So Far Away",
    "孤勇者",
    "反方向的钟",
    "C"
]) as Ref<string[]>;
</script>

<template>
	<view class="search-history" v-show="history.length > 0">
		历史

        <view class="search-history-tagsbox">

            <view
                class="search-history-tags"
                scroll-x
            >
                <view
                    class="search-history-tag"
                    v-for="item in history"
                    :key="item"
                    @click="clickHistoryTag(item)"
                >
                    {{item}}
                </view>
            </view>

            <view class="right-gradient-background"></view>
        </view>
		
		<view class="search-history-del iconfont">
			&#xe665;
		</view>

	</view>
</template>

<style lang="less">
// 外层盒子
.search-history {
    padding: 20rpx 48rpx;
    display: flex;
    column-gap: 20rpx;
    align-items: center;
    box-sizing: border-box;
}

// 历史记录标签盒子
.search-history-tagsbox {
    overflow: hidden;
    position: relative;
    flex: 1;
}
// 历史记录滚动盒子
.search-history-tags {
    display: flex;
    flex-wrap: nowrap;
    
    column-gap: 20rpx;
    overflow-x: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
    
    // 历史记录渲染元素
    .search-history-tag {
        padding: 12rpx 24rpx;
        background-color: #f2f2f2;
        border-radius: 20rpx;
        white-space: nowrap;
    }
}

// 垃圾桶
.search-history-del {
    font-size: 48rpx;
    color: #999;
}
</style>