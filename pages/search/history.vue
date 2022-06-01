<script lang="ts" setup>
import { useSearchStore } from "@/store";
const searchStore = useSearchStore();
</script>

<template>
	<view
        class="search-history"
        v-show="searchStore.history.length > 0"
    >
		历史

        <view class="search-history-tagsbox">
            <view
                class="search-history-tags"
            >
                <view
                    class="search-history-tag"
                    v-for="item in searchStore.history"
                    :key="item"
                    @click="searchStore.input_keyword(item)"
                >
                    {{item}}
                </view>
            </view>

            <view class="right-gradient-background"></view>
        </view>
		
		<view
            class="search-history-del iconfont"
            @click="searchStore.clear_history"
        >
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