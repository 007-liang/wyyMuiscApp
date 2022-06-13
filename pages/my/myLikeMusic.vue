<script setup lang='ts'>
import { 
    useUserInfo,
    useLikeMusicLibraryStore,
} from '@/store';
import { 
    getLikeList, 
    getSongDetail 
} from '@/api';
import { 
    onMounted, 
    ref 
} from 'vue-demi';

const likeStore = useLikeMusicLibraryStore();
const userInfo = useUserInfo().userInfo;
const total = ref(0);
const firstSong = likeStore.firstLikeMusicInfo;

const getList = async () => {
    const { data } = await getLikeList(userInfo.profile!.userId);
    const length = data.ids && data.ids.length;
    if (
        data.code === 200
        && data.ids
        && length
    ) {
        const { 
            pushLikeMusicId,
        } = likeStore;
        total.value = length;
        pushLikeMusicId(data.ids);
    }
};

const shoudleLoadList = () => {
    if (userInfo.login && !total.value) {
        getList();
    }
};

onMounted(shoudleLoadList);
</script>

<template>
    <navigator
        url="/pages/like-music-library/like-music-library"
        open-type="navigate"
        hover-class="none"
        class="base-shelf"
    >
        <view 
            class="like-music-box" 
            hover-stay-time="0"
            hover-start-time="0"
            hover-class="like-music-box-active"
        >
            <view class="like-music">
                <view class="like-icon iconfont">&#xe849;</view>
                <view class="like-music-img">
                    <image 
                        class="img"
                        v-if="firstSong.al?.picUrl" 
                        :lazy-load="true"
                        :src="firstSong.al.picUrl + '?param=50y50'" 
                    />
                </view>
                <view class="like-music-info">
                    <text>我喜欢的音乐</text>
                    <view class="like-music-total">{{ total }}首</view>
                </view>
            </view>
            <view :hover-stop-propagation="true">
                <view
                    class="palpitation" 
                    hover-stay-time="0"
                    hover-start-time="0"
                    hover-class="palpitation-active"
                >
                    <text class="iconfont">&#xe6e4;</text>
                    <text>心动模式</text>
                </view>
            </view>
        </view>
    </navigator>
</template>

<style lang='less'>
.like-music-box {
    padding: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.2s;
}

.like-music {
    position: relative;
    display: flex;
    gap: 20rpx;
}

.like-music-box-active {
    background-color: #cccccc;
}

.like-music-info {
    padding-top: 10rpx;
    font-size: 28rpx;

    .like-music-total {
        color: #999999;
        font-size: 24rpx;
    }
}

.like-icon {
    position: absolute;
    top: 50%;
    left: 25rpx;
    color: #ffffff;
    font-size: 40rpx;
    transform: translateY(-50%);
}

.like-music-img {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #cccccc;
    > .img {
        width: 100%;
        height: 100%;
    }
}

.palpitation {
    padding: 5rpx 20rpx;
    border-radius: 20px;
    font-size: 20rpx;
    line-height: 40rpx;
    border: 1px solid #999999;
    transition: background-color 0.2s;

    > .iconfont {
        font-size: 24rpx;
        color: #FF3A3A;
    }
}

.palpitation-active {
    background-color: #cccccc;
}
</style>
