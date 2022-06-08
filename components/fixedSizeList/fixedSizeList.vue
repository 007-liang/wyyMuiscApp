<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue';

const props = withDefaults(
    defineProps<{
        itemSize: number,
        width: number,
        height: number,
        itemCount: number,
        data?: any,
        id?: any,
        preload_count?: number
    }>(),
    {
        preload_count: 2,
        data: [],
        id: () => Math.random()
    }
);
const pixelRatio = 750 / wx.getSystemInfoSync().windowWidth
const height = ref(props.height * pixelRatio);
const width = ref(props.width * pixelRatio);
const itemSize = ref(props.itemSize * pixelRatio);

const scrollTop = ref(0);
const containerStyle = computed(() => {
    return {
        width: width.value + "rpx",
        height: height.value + "rpx",
    }
})
const contentStyle = computed(() => {
    return {
        width: "100%",
        height: itemSize.value * props.itemCount + "rpx",
        position: "relative",
        overflow: "hidden"
    }
});
const onScroll = (e: { target: {scrollTop: number} }) => {
    scrollTop.value = e.target.scrollTop;
};
const offset_index = computed(() => {
    return Math.floor(scrollTop.value / itemSize.value)
});
const start = computed(() => {
    let start = Math.floor(height.value / itemSize.value) 
    start -= props.preload_count
    return Math.max(
        0,
        start
    )
});
const end = computed(() => {
    let end = Math.ceil((height.value + scrollTop.value) / itemSize.value);
    end += + props.preload_count;
    return Math.min(
        props.itemCount,
        end
    )
});
const count = computed(() => {
    return Math.max(0, end.value - start.value) + props.preload_count * 2;
})
</script>

<template>
    <scroll-view
        class="fixed-size-list-container"
        :style="containerStyle"
        @scroll="onScroll"
        :scroll-y="true"
    >
        <view
            :style="contentStyle"
        >
            <template v-for="(item, index) in count" :key="index">
                <slot
                    :index="index + offset_index"
                    :item="(props.data.length > 0 && props.data[index]) || null"
                    :style="{
                        position: 'absolute',
                        top: itemSize * (index + offset_index) + 'rpx',
                        left: 0,
                        width: '100%',
                        height: itemSize + 'rpx'
                    }"
                />
            </template>
        </view>
    </scroll-view>
</template>

<style lang="less">
.fixed-size-list-container {
    max-width: 100%;
    max-height: 100%;
}
</style>