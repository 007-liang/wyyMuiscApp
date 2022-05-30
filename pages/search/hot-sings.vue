<script setup lang='ts'>
import { wxRequest } from '@/utils';
import { ref } from 'vue';
let sings = ref<INewsHotSings["artists"]>([]);

async function getData() {
    let res = await wxRequest<INewsHotSings>({
        url: "/top/artists",
        data: {
            offset: 0,
            limit: 10,
        }
    });
    sings.value = res.data.artists;
};
getData();
</script>

<template>
    <view class="search-hot-singsbox">
        <view class="search-hot-singsbox-title">
            热门歌手
        </view>

        <view class="search-hot-sings-scrollbox">
            <!-- <view class="left-gradient-background"></view> -->
            <!-- <view class="right-gradient-background"></view> -->
            <view class="search-hot-sings-scrollinner">
                <view
                    class="search-hot-sings-scroll-item"
                    v-for="item in sings"
                    :key="item.name"
                >
                    <image
                        mode="widthFix"
                        :src="item.picUrl"
                        class="search-hot-sing-pic"
                    />
                    <text>{{item.name}}</text>
                </view>
            </view>
        </view>

        <view class="search-more-hot-sings">
            查看更多歌手 
            <text class="iconfont">
                &#xe66b;
            </text>
        </view>
    </view>
</template>

<style lang="less">
.search-more-hot-sings {
    // 更多歌手
    padding: 40rpx;
    text-align: center;

    .iconfont {
        font-size: 32rpx;
    }
}

.search-hot-sing-pic {
    // 歌手图片
    width: 200rpx;
    border-radius: 20rpx;
}
.search-hot-sings-scrollinner {
    // 热门歌手信息 滚动盒子
    display: flex;
    column-gap: 20rpx;
    text-align: center;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
}
.search-hot-sings-scrollbox {
    // 热门歌手信息 滚动盒子容器
    position: relative;
    overflow: hidden;
}
// 标题
.search-hot-singsbox-title {
    font-weight: bold;
    margin-bottom: 20rpx;
}
// 外层盒子
.search-hot-singsbox {
    padding: 0 48rpx;
    padding-bottom: 180rpx;
}
</style>