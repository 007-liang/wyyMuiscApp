<script lang='ts' setup>
import { 
    usePlayingLibrary,
    playingSongState as state,
	useAudioStore
} from '@/store';
import { 
    setStateIndex 
} from '@/utils';
import { 
    ref,
    effect,
	nextTick,
	watch, 
} from 'vue-demi';

let outer = false;
let inside = false;
const {
    playPause,
    switchState,
} = useAudioStore();
const store = usePlayingLibrary();
const data = ref<IMusicDetail[]>([]);
const current = ref(1);
const duration = ref(500);
const invalid = ref(false);

/**
 * 按下停止播放，并且把置零的动画时间调回来
 */
const touchstart = () => {
    !inside ? inside = true : null;
    if (!duration.value) {
        duration.value = 500;
    }
};

/**
 * 当索引改变
 */
const change = (e)=> {
    if (e.detail.source) {
        invalid.value = true;
        let index = e.detail.current;
        if (index === 1) return;
        current.value = index;
    }
};

/**
 * 侧边碟出现一半则显示侧边的状态
 */
let tempFn = () => {
    if (state.playing && !outer) {
        playPause(false);
        transition = () => {};
    }
};
let transition = tempFn;

let invalidTimer: any;
/**
 * 动画完成后，让动画时间置零，瞬间回到中间一个
 */
const animationfinish = (e) => {
    if (invalid.value) { // 防抖
        clearTimeout(invalidTimer);
        invalidTimer = setTimeout(() => {
            invalid.value = false;
            invalidTimer = null;
        }, 500);
    }
    // 复原
    transition = tempFn;

    if (e.detail.source !== 'touch') {
        // 不是人为触发的动画
        outer = false;
        if (!e.detail.source) {
            current.value = 1;
            return;
        }
    }
    
    let i = e.detail.current;

    if (i === 1)  { // 防止移动但没有切换
        inside = false;
        playPause(true);
        return;
    };
    
    let list = store.state.list!;
    let index = store.index!;

    if(i > 1) {
        setStateIndex(index, list.length - 1, true);
    } else {
        setStateIndex(index, list.length - 1, false);
    }

    // 置零动画时间
    duration.value = 0;
    current.value = 1;
    switchState(list[store.index!]);
    nextTick().then(() => inside = false);
};

effect(() => {
    let index = store.index || 0;
    let state = store.state;
    let list = state.list!;
    // 将渲染放到下一个渲染队列，防止出现切换闪烁
    nextTick(() => {
        let i = 0;
        // 添加三个元素进去
        if (!list || !list.length) return;
        data.value = [];
        if (list.length === 1) {
            for (; i < 3; i++) data.value.push(list[index]);
        } else if (list.length === 2) {
            for (; i < 3; i++) {
                if (i === index) {
                    data.value.push(list[index]);
                    continue;
                }
                if (index === 0) {
                    data.value.push(list[1]);
                } else {
                    data.value.push(list[0]);
                }
            }
        } else {
            let length = list.length;
            if (index ===  length -1) {
                data.value.push(...list.slice(index - 1), list[0]);
            } else if (index === 0) {
                data.value.push(list[length -1], ...list.slice(index, index + 2), );
            } else {
                data.value.push(...list.slice(index - 1, index + 2));
            }
        }
    });
});

watch(
    () => store.index!,
    (n, o) => {
        if (inside || n === null) return;
        let list = store.state.list!;
        let length = list.length;

        outer = true;
        state.playing = false;
        duration.value = 500;
        
        if ( // 下一首
            (n - o) === 1
            || (o === length - 1 && n === 0) // 边界判断
        ) {
            current.value = 0;
        } else if ( // 上一首
            (n - o) === -1
            || (o === 0 && n === length - 1) // 边界判断
        ) {
            current.value = 2;
        }
        // 为了比渲染队列更慢，需要使用setTimout直接
        setTimeout(() => {
            current.value = 1;
        });
    }
);
</script>

<template>
    <swiper 
        class="cd-swiper" 
        easing-function="easeOutCubic" 
        :class="{ invalid: invalid }"
        :current="current"
        :duration="duration"
        @touchstart="touchstart"
        @change="change"
        @transition="transition"
        @animationfinish="animationfinish"
        @click="inside ? inside = false : null;"
    > <!-- 按下去没有移动的情况需要用click事件将inside=false -->

        <template  v-if="!data.length">
            <view v-for="num in 3" :key="num"></view>
        </template>
        <template v-else>
            <swiper-item
                v-for="(itme) in data" 
                :key="itme.id"
                class="cd-swiper-item"
            >
                <view 
                    class="cd-cover-box"
                    :class="{paused: !state.playing}"
                >
                    <image 
                        class="cd-cover" 
                        :lazy-load="true"
                        :src="itme.al.picUrl + '?param=500y500'" 
                    />
                </view>
            </swiper-item>
        </template>
    </swiper>
</template>

<style lang='less'>
.cd-swiper {
    position: relative;
    top: 30%;
    height: 500rpx;
}
.cd-swiper-item {
    display: flex;
    justify-content: center;
    align-items: center;
}
.cd-cover-box {
    box-sizing: border-box;
    position: relative;
    display: flex;
    width: 500rpx;
    height: 500rpx;
    justify-content: center;
    align-items: center;
    background: url('/static/disc.png') center no-repeat;
    background-size: 110%;
    border-radius: 50%;
    animation: rotate 20s linear infinite;
    overflow: hidden;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('/static/996fc8a2bc62e1ab3f51f135fc459577.png') center no-repeat;
        background-size: cover;
    }
}
.cd-cover {
    width: 350rpx;
    height: 350rpx;
    border-radius: 50%;
    overflow: hidden;
}
.paused {
    animation: rotate 20s linear infinite;
    animation-play-state: paused;
}
.invalid {
    pointer-events: none;
}
@keyframes rotate{
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
