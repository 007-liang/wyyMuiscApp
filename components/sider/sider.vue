<script setup lang='ts'>
import { ref } from 'vue';
const props = withDefaults(
    defineProps<{
        show?: boolean,
        width?: string,
        backgroundColor?: string,
    }>(), 
    {
        show: false,
        width: "600rpx",
        backgroundColor: "#eee"
    }
);
const emit = defineEmits([
    "update:show"
]);
const sider = ref();
const maskStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 11,
};
const containerTransitionStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: props.width,
    height: "100vh",
    zIndex: 12,
}
const containerStyle = {
    width: props.width,
    backgroundColor: props.backgroundColor,
};
</script>

<template>
    <!-- 侧边栏 -->
    <!-- <view class="sider-root" v-show="props.show"> -->
        <uni-transition
            :show="props.show"
            ref="sider"
            :styles="containerTransitionStyle"
            mode-class="slide-left"
        >
            <view
                class="sider-container scrollbar-none"
                :style="containerStyle"
            >
                <slot></slot>
            </view>
        </uni-transition>
        <uni-transition
            mode-class="fade"
            :show="props.show"
            :styles="maskStyles"
        >
            <view
                class="sider-mask"
                @click="emit('update:show', false)"
            ></view>
        </uni-transition>
    <!-- </view> -->
</template>

<style lang="less" scoped>
.sider-container {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    overflow-y: scroll;
}

.sider-mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .4);
}
.sider-root {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
}
</style>