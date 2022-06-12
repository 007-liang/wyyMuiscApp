<script setup lang='ts'>
import { usePlayingSongStore } from '@/store';

const { 
    playingSongState: state 
} = usePlayingSongStore();
</script>

<template>
    <view class="header">
        <navigator
            open-type="navigateBack"
            delta="1"
            hover-class="none"
            class="iconfont"
        > &#xe66d; </navigator>
        <view class="header-main">
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

.header-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.title {
    width: 60vw;
    font-size: 28rpx;
    font-weight: 700;
}

.author {
    width: 60vw;
    padding-top: 10rpx;
    font-size: 20rpx;
    color: #cccccc;
}
</style>
