<script setup lang='ts'>
const tags = [
    {
        title: "最近播放",
        icon: "&#xe7c4;"
    },
    {
        title: "本地/下载",
        icon: "&#xe7c4;"
    },
    {
        title: "云盘",
        icon: "&#xe7c4;"
    },
    {
        title: "已购",
        icon: "&#xe7c4;"
    },
    {
        title: "我的好友",
        icon: "&#xe7c4;"
    },
    {
        title: "收藏和赞",
        icon: "&#xe7c4;"
    },
    {
        title: "我的博客",
        icon: "&#xe7c4;"
    },
    {
        title: "音乐罐子",
        icon: "&#xe7c4;"
    },
]
</script>

<template>
    <view class="section">
        <view class="my-tag">
            <text class="iconfont">
                &#xe6d7;
            </text>
            最近播放
        </view>
        <view class="my-tag">
            <text class="iconfont">
                &#xe693;
            </text>
            本地/下载
        </view>
        <view class="my-tag">
            <text class="iconfont">
                &#xe6b3;
            </text>
            云盘
        </view>
        <view class="my-tag">
            <text class="iconfont">
                &#xe60b;
            </text>
            已购
        </view>
        <view class="my-tag">
            <text class="iconfont">
                &#xe7ff;
            </text>
            我的好友
        </view>
        <view class="my-tag">
            <text class="iconfont">
                &#xe8c6;
            </text>
            收藏和赞
        </view>
        <view class="my-tag">
            <text class="iconfont">
                &#xe618;
            </text>
            我的播客
        </view>
        <view class="my-tag">
            <text class="iconfont">
                &#xe618;
            </text>
            音乐罐子
        </view>
    </view>
</template>

<style scoped lang="less">
.my-tag {
    display: flex;
    flex-direction: column;
    row-gap: 10rpx;
    align-items: center;
    font-size: 28rpx;
    .iconfont {
        font-size: 68rpx;
        color: rgb(224, 95, 95);
    }
}
.section {
    margin: 20rpx;
    padding: 40rpx;
    border-radius: 20rpx;
    display: grid;
    row-gap: 40rpx;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
}
</style>