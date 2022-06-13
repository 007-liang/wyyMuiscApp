<script setup lang='ts'>
import { 
    ref, 
    effect 
} from "vue";
import { 
    state, 
    usePlayingLibrary,
    useLikeMusicLibraryStore
} from "@/store";
import ProgressBar from "./progressBar.vue";
import Control from "./control.vue";

const liked = ref(false);
const likeLibrary = useLikeMusicLibraryStore();
const playingLibrary = usePlayingLibrary();

effect(
    () => {
        let i = playingLibrary.index
        if (i !== null) {
            const { likeMusicIds } = likeLibrary;
            const { id } = state.list![i];
           if (likeMusicIds.includes(id)) {
                liked.value = true;
           } else {
                liked.value = false;
           }
        }
    }
);
</script>

<template>
    <view class="footer">
        <text class="tips-vip">
            正在试听，
            <text style="color: red">
                VIP仅0.29元/天，畅听完整版
                <view class="iconfont">&#xe66b;</view>
            </text>
        </text>
        <view class="icons">
            <text v-if="!liked" class="iconfont">&#xe7df;</text>
            <text v-else class="iconfont" style="color: red">&#xe849;</text>
            <text class="iconfont">&#xe693;</text>
            <text class="iconfont">&#xe7f5;</text>
        </view>
        <ProgressBar></ProgressBar>
        <Control></Control>
    </view>
</template>

<style lang='less'>
.footer {
    box-sizing: border-box;
    position: fixed;
    padding: 30rpx;
    width: 100%;
    bottom: 0;
    left: 0;
    text-align: center;
}
.tips-vip {
    padding: 10rpx 20rpx;
    color: #ffffff;
    border-radius: 20px;
    background-color: #000000;
    font-size: 18rpx;
}
.icons {
    padding: 30rpx 0;
    display: flex;
    justify-content: center;
    gap: 50rpx;
    color: #cccccc;
}
</style>
