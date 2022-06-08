<script setup lang='ts'>
import { useMusicLibraryStore } from '@/store/store-music-library';
import {
    transform_num_unit
} from "@/utils";
import { computed, ref } from 'vue';

const store = useMusicLibraryStore();

const is_show_more_detail = ref(false);
const show_more_detail = () => {
    is_show_more_detail.value = true;
}
const coverImg = computed(() => {
    return store.playlist.coverImgUrl;
})
const styles = {
    zIndex: 10,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    overflow: "auto"
}
</script>

<template>
    <uni-transition
        mode-class="fade"
        :show="is_show_more_detail"
        custom-class="music-library-more-detail-container"
        :styles="styles"
        @click="is_show_more_detail = false"
    >
        <view class="music-library-filter"></view>
        <image
            mode="center"
            class="music-library-bg"
            style="height: 100%;"
            :src="coverImg"
        />
        <view
            class="music-library-more-detail"
        >
            <view class="iconfont">
                &#xe668;
            </view>
            <image
                mode="widthFix"
                :src="coverImg"
                class="img"
                style="width: 440rpx;"
            ></image>

            <view class="music-library-more-detail-name">
                {{store.playlist.name}}
            </view>

            <view class="line"></view>

            <view
                class="music-library-more-detail-tags"
            >
                标签:
                <view
                    class="music-library-more-detail-tag"
                    v-for="item in store.playlist.tags"
                    :key="item"
                >
                    {{item}}
                </view>
            </view>

            <view style="width: 100%;line-height: 60rpx;">
                {{store.playlist.description}}
            </view>
        </view>
    </uni-transition>
    <view
        class="music-library-detail"
    >   
        <view
            class="music-library-picbox"
            @click="show_more_detail"
        >
            <image
                class="music-library-pic"
                :src="coverImg"
                mode="widthFix"
            />
            <view class="music-library-picbox-playcount">
                <text class="iconfont">
                    &#xe680;
                </text>
                {{transform_num_unit(store.playlist.playCount)}}
            </view>
        </view>

        <view class="music-library-msg">
            <view
                class="music-library-msg-title"
                @click="show_more_detail"
            >
                {{store.playlist.name}}
            </view>
            <view
                class="music-library-creator"
            >
                <image
                    mode="widthFix"
                    class="music-library-creator-avatar"
                    :src="store.playlist.creator.avatarUrl"
                ></image>

                <view
                    class="music-library-creator-name text-hidden"
                    style="width: 200rpx"
                >
                    {{store.playlist.creator.nickname}}
                </view>

                <view class="music-library-creator-subscribe">
                    +
                </view>
            </view>
            
            <view
                class="music-library-description"
                @click="show_more_detail"
            >
                <view class="music-library-description-text">
                    {{store.playlist.description}}
                </view>
                <text class="iconfont">
                    &#xe66b;
                </text>
            </view>
        </view>
    </view>
</template>

<style lang="less" scope>
.music-library-more-detail {
    box-sizing: border-box;
    // height: 100vh;
    padding: 60rpx;
    display: flex;
    row-gap: 40rpx;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    overflow: auto;

    .iconfont {
        position: absolute;
        right: 40rpx;
        top: 40rpx;
        font-size: 46rpx;
    }

    .music-library-more-detail-name {
        font-size: 40rpx;
        font-weight: bold;
        text-align: center;
    }

    .line {
        width: 100%;
        height: 4rpx;
        background: radial-gradient(
            rgba(255, 255, 255, .2),
            rgba(255, 255, 255, 0)
        ) ;
    }

    .music-library-more-detail-tags {
        width: 100%;
        display: flex;
        align-items: center;
        column-gap: 20rpx;
    }

    .music-library-more-detail-tag {
        padding: 10rpx 20rpx;
        border-radius: 40rpx;
        background-color: rgba(255, 255, 255, .2);
    }
}

@descriptionColor: rgba(255, 255, 255, .6);
.music-library-creator {
    display: flex;
    align-items: center;
    column-gap: 20rpx;
    color: @descriptionColor;

    margin: 40rpx 0;

    .music-library-creator-name {
        flex: 1;
    }

    .music-library-creator-avatar {
        width: 60rpx;
        border-radius: 50%;
    }

    .music-library-creator-subscribe {
        padding: 0rpx 20rpx;
        background-color: rgba(255, 255, 255, .2);
        border-radius: 40rpx;
        font-size: 34rpx;
    }
}

.music-library-description {
    display: flex;
    align-items: center;
    overflow: hidden;
    color: @descriptionColor;
    
    .music-library-description-text {
        width: 300rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.music-library-msg-title {
    font-size: 34rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.music-library-msg {
    padding-top: 20rpx;
    color: #fff;
}
.music-library-picbox-playcount {
    color: #fff;
    position: absolute;
    top: 20rpx;
    right: 20rpx;
    padding: 6rpx 14rpx;
    background-color: rgba(0, 0, 0, .6);
    border-radius: 20rpx;
}

.music-library-pic {
    width: 280rpx;
    border-radius: 20rpx;
}

.music-library-picbox {
    position: relative;
}

.music-library-detail {
    padding: 60rpx 40rpx;
    position: relative;
    overflow: hidden;
    display: flex;
    column-gap: 40rpx;
}
</style>