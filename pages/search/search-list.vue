<script setup lang='ts'>
import {
    useSearchStore
} from "@/store";
const searchStore = useSearchStore();
</script>

<template>
    <view
        v-for="item in searchStore.searchs"
        :key="item.keyword"
        class="searchlistsbox"
        @click="searchStore.push_history(item.keyword)"
    >
        <text class="iconfont">
            &#xe8f3;
        </text>
        <view class="searchlists-text">
            {{item.keyword}}
        </view>
    </view>
</template>

<style lang="less">
// 外层盒子
.searchlistsbox {
    display: flex;
    align-items: center;
    .iconfont {
        font-size: 38rpx;
        margin: 0 12rpx;
    }
}

// 搜索文本
.searchlists-text {
    flex: 1;
    padding: 36rpx 4rpx;
    border-bottom: 2rpx solid #ddd
}
</style>