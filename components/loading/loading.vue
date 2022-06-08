<script setup lang='ts'>
let props = defineProps<{
    styles?: object | string
}>()
</script>

<template>
    <view class="loading" :style="props.styles">
        <text class="iconfont">
            &#xe9ff;
        </text>
        正在加载中
    </view>
</template>

<style lang="less">
.loading {
    width: 100%;
    color: red;
    font-size: 36rpx;
    text-align: center;

    .iconfont {
        font-size: 58rpx;
        animation: loading 4s linear infinite;
    }

    @keyframes loading {
        100% {
            transform: rotate(360deg);
        }
    }
}
</style>