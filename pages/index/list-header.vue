<script setup lang='ts'>
const props = defineProps<{
    title: string,
    path?: string
}>();
const to_path = () => {
    props.path && wx.navigateTo({
        url: props.path
    });
}
</script>

<template>
    <view class="index-card-header">
        <view class="index-card-title">
            {{props.title}}
        </view>
        <view
            class="index-card-more"
            @click="to_path"
        >
            更多
            <text class="iconfont">
                &#xe66b;
            </text>
        </view>
    </view>
</template>

<style lang="less">
.index-card-header {
    display: flex;
    padding: 0 0 20rpx;
    justify-content: space-between;
    align-items: center;
}

.index-card-title {
    font-size: 38rpx;
    font-weight: bold;
}

.index-card-more {
    font-weight: bold;
    padding: 6rpx 16rpx;
    border-radius: 30rpx;
    border: 2rpx solid #ddd;
    font-size: 24rpx;
    .iconfont {
        font-size: 24rpx;
    }
}
</style>