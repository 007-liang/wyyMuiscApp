<script setup lang='ts'>
import { useSlots } from 'vue';
const emit = defineEmits(["click"]);
const props = withDefaults(
    defineProps<{
        title?: string,
        icon?: string,
        subtitle?: string,
        borderBottom?: boolean,
        showRightIcon?: boolean,
    }>(),
    {
        showRightIcon: true,
    }
);
const slots = useSlots();
</script>

<template>
    <view
        class="side-item"
        :class="{
            'border-bottom': props.borderBottom
        }"
        @click="emit('click')"
    >
        <view class="side-item-icon" :class="{
            iconfont: props.icon && !slots.icon
        }">
            <slot name="icon"></slot>
            <template v-if="!slots.icon">
                {{props.icon}}
            </template>
        </view>
        <view class="side-item-title">
            <slot name="title"></slot>
            <template v-if="!slots.title">
                {{props.title}}
            </template>
        </view>
        <view
            class="side-item-subtitle"
        >
            <slot name="subtitle"></slot>
            <template v-if="!slots.subtitle">
                {{props.subtitle}}
            </template>
        </view>
        
        <text class="iconfont" v-if="showRightIcon">
            &#xe66b;
        </text>
    </view>
</template>

<style lang="less" scoped>
@font: 36rpx;
.side-item {
    display: flex;
    align-items: center;
    font-size: @font;
    column-gap: 20rpx;
    padding: 40rpx 20rpx 40rpx 0;
    margin-left: 60rpx;
    position: relative;
}

.iconfont {
    font-size: @font;
    position: absolute;
    right: 40rpx;
    color: #999;
}

.side-item-subtitle {
    font-size: 30rpx;
    position: absolute;
    right: 90rpx;
    color: #999;
}

.border-bottom {
    border-bottom: 2rpx solid #d2d2d2;
}
</style>