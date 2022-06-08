<script setup lang='ts'>
import { usePlayingSongStore } from '@/store/playingSong';

const { state } = usePlayingSongStore();
</script>

<template>
    <view class="header">
        <navigator
            open-type="navigateBack"
            delta="1"
            hover-class="none"
            class="iconfont"
        > &#xe66d; </navigator>
        <view>
            <view class="title ellipsis">
                {{ state.name }}
            </view>
            <view class="author ellipsis">
                {{  state.author }}
            </view>
        </view>
        <view class="iconfont">&#xe7e7;</view>
    </view>
</template>

<style lang='less'>
.header {
    display: flex;
    justify-content: space-between;
    color: #ffffff;
    text-align: center;

    > .iconfont {
        font-size: 50rpx;
    }
}

.title {
    font-size: 24rpx;
    font-weight: 700;
}

.author {
    padding-top: 10rpx;
    font-size: 20rpx;
    color: #cccccc;
}
</style>
