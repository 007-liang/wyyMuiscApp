<script setup lang='ts'>
import { to_search_page } from "@/utils";
</script>

<template>
    <view class="my-header">
        <side />

        <text
            class="iconfont"
            @click="to_search_page"
        >
            &#xe8f3;
        </text>
    </view>
</template>

<style lang="less">
.my-header {
    padding: 40rpx;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .iconfont {
        font-size: 48rpx;
    }
}
</style>