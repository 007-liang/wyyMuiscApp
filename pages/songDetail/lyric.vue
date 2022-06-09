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
    onBeforeMount,
	watch,
} from "vue";
import { 
    usePlayingSongStore,
    useAudioStore
} from "@/store";
import voiceVue from "./voice.vue";

let textH = 0;
let nullSapce = 0;
let updateTimer: any;
const tname = ref('');
const key = ref(0);
const scrollTop = ref(-1);
const loading = ref(true);
const needDesc = ref(false);
const pure = ref(false);
const lyricData = ref<TParsedLyric>([]);
const {  
    playingSongState: state 
} = usePlayingSongStore();
const { 
    audioCtx 
} = useAudioStore();
const clear = () => {
    clearInterval(updateTimer);
    updateTimer = null;
};
const instance = getCurrentInstance();
// 滚动歌词的主逻辑
const timerCallBack = () => {
    if (lyricData.value.length === 0) {
        return clear();
    }
    if (audioCtx.paused || loading.value) return;
    let lyricList = lyricData.value!;
    let length = lyricList.length;
    let currentTime = audioCtx.currentTime;
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
        let offset = item.time - currentTime;
        if (!item.text) nullSapce++; // 处理没有文本但是占用了key的空间
        if (offset >= -0.2 && offset <= 0.2) {
            if (item.text) {
                let scrollT = (i - nullSapce) * textH;
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
    nullSapce = 0;
};
// 设置定时器滚动歌词
const setTimer = () => {
    updateTimer = setInterval(timerCallBack, 200);
};
// 等待歌词渲染完成
const awaiteRender = () => {
    uni.createSelectorQuery().in(instance)
    .select('.lyric-text')
    .boundingClientRect((rect) => {
        if (rect && rect.height) {
            textH = rect.height || 40;
            watchEffect(() => {
                if (state.playing) {
                    setTimer();
                } else {
                    clear();
                }
            });
        }
    }).exec();
};

const init = async () => {
    const id = state.id;
    const { data } = await wxRequest<
        ISongLyric & CloudMusicRes
    >({
        url: '/lyric',
        data: { 
            id,
        },
    });
    if (data.needDesc && !data.lrc.lyric) {
        needDesc.value = data.needDesc;
    } else if(data.sgc || data.sfy || data.qfy) {
        pure.value = true;
    } else if (data.code === 200) {
        const {
            lrc,
            tlyric,
            transUser,
        } = data;
        const { lyric } = state;
        lyric.id = id;
        lyric.data = lyricData.value = parseLyricData(
            lrc.lyric, 
            tlyric?.lyric
        );
        if (tlyric && transUser) {
            tname.value = transUser.nickname;
        } else {
            tname.value = '';
        }
        awaiteRender();
    }
    loading.value = false;
};

onBeforeMount(() => {
    let data = state.lyric.data;
    if (
        state.lyric.id === state.id 
        && data.length
    ) {
        // 获取state中的歌词
        loading.value = false;
        lyricData.value = data;
        awaiteRender();
    }
});

watch(
    () => state.id,
    async (id) => {
        key.value = 0;
        scrollTop.value = 0;
        loading.value = true;
        lyricData.value = [];
        // 当id改变，需重新获取歌词
        if (state.showLyric && state.lyric.id !== id) {
            // 获取歌词
            await init();
        } else {
            loading.value = false;
            lyricData.value = state.lyric.data;
            awaiteRender();
        }
    }
);

watch(
    () => state.showLyric,
    async (show) => {
        // 当显示,且id不一致时需要重新获取歌词
        if (show && state.lyric.id !== state.id) {
            scrollTop.value = 0;
            loading.value = true;
            await init();
        }
    }
);

onUnmounted(() => {
    clear();
    audioCtx.offCanplay(setTimer);
});
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
        <template v-else-if="lyricData.length">
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
                    <view 
                        class="elipsis"
                    >{{ item.text }}</view>
                    <text 
                        v-if="item.tText" 
                        class="elipsis"
                    >{{ item.tText }}</text>
                </view>
            </template>
            <view 
                v-if="tname" 
                class="lyric-text"
            >
                翻译贡献者：{{ tname }}
            </view>
        </template>
        <view 
            v-else-if="pure"
            class="lyric-text lyric-active"
        >
            请欣赏，纯音乐
        </view>
        <view 
            v-else
            class="lyric-text lyric-active"
        >
            暂无歌词
        </view>
        <view class="lyric-text"></view>
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
    padding-top: 25vh;
}

.lyric-text {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    color: #999999;
    font-size: 22rpx;
    height: 80rpx;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: color 0.2s, font-size 0.2s;
    
    .elipsis {
        width: 80vw;
    }
}

.lyric-active {
    color: #ffffff;
    font-weight: 700;
    font-size: 26rpx;
}
</style>
