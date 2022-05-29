<template>
    <view class="search-hot-navbar">
        <view
            v-for="(item, index) in hotBar"
            :key="item.title"
            @click="activeHotBarIndex = index"
            :class="{ active: activeHotBarIndex == index }"
        >
            {{item.title}}
        </view>
    </view>
    <view class="search-hot-detail">
        <view class="search-hot-categorys">
            <template v-for="(item, index) in hots" :key="item.first">
                <view
                    class="search-hot-category"
                    :class="{ active: index < 3 }"
                    v-if="isShowDetail ? true : index < hots.length / 2"
                >
                    <text class="search-hot-index">{{index + 1}}</text>
                    <text class="search-hot-keyword">{{item.searchWord}}</text>
                </view>
            </template>
            <view
                class="search-show-detail"
                v-if="!isShowDetail"
                @click="isShowDetail = true"
            >
                展开更多热搜 <text class="iconfont">&#xe66b;</text>
            </view>
        </view>
        <view class="search-hot-categorys">
            <template v-for="(item, index) in hots" :key="item.first">
                <view
                    class="search-hot-category"
                    :class="{ active: index < 3 }"
                    v-if="isShowDetail ? true : index < hots.length / 2"
                >
                    <text class="search-hot-index">{{index + 1}}</text>
                    <text class="search-hot-keyword">{{item.searchWord}}</text>
                </view>
            </template>
            <view
                class="search-show-detail"
                v-if="!isShowDetail"
                @click="isShowDetail = true"
            >
                展开更多热搜 <text class="iconfont">&#xe66b;</text>
            </view>
        </view>
    </view>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { wxRequest } from '../../utils'
export default defineComponent({
    data() {
        return {
            hotBar: [
                {
                    title: "热搜榜",
                    url: "/search/hot"
                },
                {
                    title: "热搜榜2",
                    url: "/search/hot"
                }
            ], // 热搜导航
            activeHotBarIndex: 0, // 选中的热搜导航
            isShowDetail: false, // 是否要显示热搜榜单详情
            hots: [] as ISearchHotData[], // 热搜
            videos: [], // 视频
            users: [], // 博客
        }
    },
    watch: {
        isShowDetail() {
            this.getHots();
        }
    },
    methods: {
        async getHots() {
            let res = await wxRequest<ISearchHot>({
                url: "/search/hot/detail" ,
            });
            this.hots = res.data.data;
        }
    },
    created() {
        this.getHots();
    }
})
</script>

<style lang="less">
.search-hot-detail {
    display: flex;
    column-gap:  20rpx;
    padding: 36rpx 48rpx;
}

.search-show-detail {
    width: 200%;
    margin-top: 20rpx;
    text-align: center;
    color: #999;
    .iconfont {
        transform: rotate(90deg);
        display: inline-block;
    }
}

.search-hot-categorys {
    display: grid;
    grid-template-columns: repeat(2, 310rpx);
    row-gap: 36rpx;
    padding: 36rpx;
    box-shadow: 0 0 10rpx 10rpx #f2f2f2;
    font-size: 36rpx;
    border-radius: 20rpx;

    .search-hot-category {
        // padding: 14rpx 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .search-hot-index {
        margin-right: 28rpx;
    }

    .active {
        .search-hot-index {
            color: red;
        }
        .search-hot-keyword {
            font-weight: bold;
        }
    }
}

.search-hot-navbar {
    display: flex;
    column-gap: 60rpx;
    padding: 20rpx 48rpx;
    color: #999;
    font-size: 32rpx;

    .active {
        color: #333;
    }
}
</style>