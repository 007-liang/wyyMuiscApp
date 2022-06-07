<script setup lang='ts'>
import { 
	forEach,
    parseLyricData, 
    wxRequest 
} from "@/utils";
import { 
    ref,
    watchEffect, 
	onUnmounted,
    getCurrentInstance,
    nextTick,
} from "vue";
import { 
    usePlayingSongStore,
    audioCtx
} from "@/store";
import voiceVue from "./voice.vue";

let textH = 0;
let updateTimer: any;
let first = true;
const tname = ref('');
const key = ref(0);
const scrollTop = ref(0);
const loading = ref(true);
const lyricData = ref<TParsedLyric>([]);
const { state } = usePlayingSongStore();
const clear = () => {
    clearInterval(updateTimer);
    updateTimer = null;
};
const instance = getCurrentInstance();
// 滚动歌词的主逻辑
const timerCallBack = () => {
    let lyricList = lyricData.value!;
    let length = lyricList.length;
    let currentTime = Math.floor(audioCtx.currentTime);
    if (currentTime <=  Math.floor(lyricList[0].time)) {
        scrollTop.value = 0;
        key.value = 0; 
        return;
    } else if (currentTime >= Math.floor(lyricList[length -1].time)) {
        scrollTop.value = textH * length - 1;
        key.value = length -1; 
        return;
    }
    forEach(lyricList, (item, i) => {
        let nextItem = lyricList[i + 1];
        if (
            Math.floor(item.time) === currentTime
        ) {
            if (item.text) {
                let scrollT = i * textH;
                if (scrollTop.value !== scrollT) {
                    scrollTop.value = scrollT;
                    key.value = i;
                }
            }
            return true;
        } else if ( // 处理随意跳转
            nextItem
            && currentTime > item.time
            && currentTime < nextItem.time
        ) {
            scrollTop.value = i * textH;
            key.value = i;
            return true;
        }
    });
};
// 设置定时器滚动歌词
const lyricMove = () => {
    watchEffect(() => {
        if (state.playing) {
            updateTimer = setInterval(timerCallBack, 200);
        } else {
            clear();
        }
    });
};
// 等待歌词渲染完成
const awaiteRender = () => {
    if (state.showLyric && first) {
        first = false;
        uni.createSelectorQuery().in(instance)
        .select('.lyric-text')
        .boundingClientRect((rect) => {
            if (rect && rect.height) {
                textH = rect.height || 40;
                lyricMove();
            } else {
                setTimeout(awaiteRender, 200);
            }
        }).exec();
    }
};
// 获取歌词
watchEffect(async () => {
    const { id  } = state;
    if (!isNaN(id) && id !== -1) {
        const { data } = await wxRequest<
            ISongLyric & CloudMusicRes
        >({
            url: '/lyric',
            data: { id },
        });
        if (data.code === 200) {
            loading.value = false;
            lyricData.value = parseLyricData(
                data.lrc.lyric, 
                data.tlyric?.lyric
            );
            if (data.tlyric && data.transUser) {
                tname.value = data.transUser.nickname;
            } else {
                tname.value = '';
            }
            nextTick(awaiteRender);
        }
    }
});
onUnmounted(clear);
</script>

<template>
    <voiceVue></voiceVue>
    <scroll-view 
        class="lyric"
        :scroll-top="scrollTop"
        :enhanced="true"
        :scroll-with-animation="true"
        :show-scrollbar="false"
        :scroll-y="true"
        :lower-threshold="0"
        :upper-threshold="0"
        @click="state.showLyric = false"
    >
        <view class="lyric-padding"></view>
        <view 
            v-if="loading"
            class="lyric-text lyric-active"
        >
            正在加载歌词...
        </view>
        <template v-else>
            <template
                v-for="(item, i) in lyricData"
                :key="i"
            >
                <view 
                    v-if="item.text"
                    class="lyric-text"
                    :class="{
                        'lyric-active': i === key
                    }"
                >
                    <view>{{ item.text }}</view>
                    <view v-if="item.tText">{{ item.tText }}</view>
                </view>
            </template>
            <view 
                v-if="tname" 
                class="lyric-text"
            >
                翻译贡献者：{{ tname }}
            </view>
        </template>
        <view class="lyric-padding"></view>
    </scroll-view>
</template>

<style lang='less' >
.lyric {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 60vh;
    overflow-y: scroll;

    &::before,
    &::after {
        content: '';
        position: absolute;
        left: 0;
        width: 100%;
        height: 80rpx;
        z-index: 100;
    }

    &::before {
        top: 0;
    }
     &::after {
        bottom: 0;
    }
}

.lyric-padding {
    padding-top: calc(60vh / 2);
}

.lyric-text {
    display: flex;
    box-sizing: border-box;
    color: #999999;
    font-size: 22rpx;
    height: 80rpx;
    justify-content: center;
    align-items: center;
    transition: color 0.2s, font-size 0.2s;
}

.lyric-active {
    color: #ffffff;
    font-weight: 700;
    font-size: 26rpx;
    text-align: center;
}
</style>
