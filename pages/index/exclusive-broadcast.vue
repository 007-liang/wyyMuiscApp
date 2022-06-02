<script setup lang='ts'>
import { wxRequest } from "@/utils";
import { ref } from "vue";
import Header from "./components/list-header.vue";
const exclusive_boradcast_lists = ref<IIndexExclusiveBroadcastResult[]>([]);
const get_exclusive_boradcast_list = async () => {
    let res = await wxRequest<IIndexExclusiveBroadcastRes>({
        url: "/personalized/privatecontent"
    });
    exclusive_boradcast_lists.value = res.data.result;
};
get_exclusive_boradcast_list();
</script>

<template>
    <view class="section">
        <Header title="独家放送" />
        <view
            class="index-exclusive-boradcast"
            v-for="item in exclusive_boradcast_lists"
            :key="item.name"
        >
            <image :src="item.picUrl" mode="widthFix" />
            <text>
                {{item.name}}
            </text>
        </view>
    </view>
</template>

<style lang="less" scoped>
.index-exclusive-boradcast {
    margin-bottom: 20rpx;
    text-align: center;
}
image {
    width: 100%;
}
</style>