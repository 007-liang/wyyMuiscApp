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
            <view
                v-for="(item, index) in hots"
                :key="item.first"
            >
                <text>{{index + 1}}</text>
                <text>{{item.first}}</text>
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
            ],
            activeHotBarIndex: 0,
            hots: [] as ISearchHotData[], // 热搜
            videos: [], // 视频
            users: [], // 博客
        }
    },
    setup() {
        
    },
    async created() {
        let res = await wxRequest<ISearchHot>({
            url: "/search/hot"
        });
        this.hots = res.data.result.hots;
        console.log(this.hots);
        
    }
})
</script>

<style lang="less">
.search-hot-navbar {
    display: flex;
    column-gap: 30px;
    padding: 10px;
    color: #999;
    font-size: 16px;

    view.active {
        color: #333;
    }
}
</style>