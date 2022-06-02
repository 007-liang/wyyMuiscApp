<script setup lang='ts'>
const categorys = [
    {
        title: "每日推荐"
    },
    {
        title: "私人FM"
    },
    {
        title: "歌单"
    },
    {
        title: "排行榜"
    },
    {
        title: "直播"
    },
    {
        title: "数字专辑"
    },
    {
        title: "有声书"
    },
    {
        title: "关注新歌"
    },
    {
        title: "歌房"
    },
    {
        title: "游戏专区"
    },
]
</script>

<template>
    <view class="section">
        <view class="index-categorys  scrollbar-none">
            <view
                class="index-category"
                v-for="item in categorys"
                :key="item.title"
            >
                <view class="index-cateogry-icon iconfont">
                    &#xe8b4;
                </view>
                <view>
                    {{item.title}}
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="less" scoped>
.section {
    padding: 20rpx;
    overflow: hidden;
}
.index-cateogry-icon {
    font-size: 60rpx;
    border-radius: 50%;
    background-color: pink;
    width: 120rpx;
    height: 120rpx;
    line-height: 120rpx;
    margin-bottom: 20rpx;
}
.index-categorys {
    display: flex;
    white-space: nowrap;
    overflow-x: scroll;
    column-gap: 40rpx;
    background-color: #fff;
    text-align: center;
}
</style>