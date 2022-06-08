<script setup lang="ts">
import { forEach, wxRequest, to_music_library } from "@/utils";
import { ref } from "vue-demi";
import { getRecommendSongSheet } from "@/api";
import { useUserInfo } from "@/store";
import loginBar from './loginBar.vue'; // 已登录栏
import notLoginBar from './notLoginBar.vue'; // 未登录栏
import myLikeMusic from "./myLikeMusic.vue"; // 我喜欢的音乐栏
import tags from "./tags.vue";
import Header from "./header.vue"; 

type TSongSheet = (IRSongSheet | ITopListDetail)[];
const songSheet = ref<TSongSheet>([]);
const userInfo = useUserInfo().userInfo;
// 获取排行榜
const recommendSongList = async () => {
	const { data } = await wxRequest<ITopListData & CloudMusicRes>({
		url: '/toplist/detail',
	});
	if (data.code === 200 && data.list) {
		forEach(data.list, (data) => {
			let { ToplistType } = data;
			if (!ToplistType) return true;
			if (/^(N|H|)$/.test(ToplistType)) {
				songSheet.value.push(data);
			}
		});
		recommendSongSheet();
	}
};
// 获取歌单
const recommendSongSheet = async () => {
	const { data } = await getRecommendSongSheet();
	if (data.code === 200 && data.recommend) {
		songSheet.value.push(...data.recommend.slice(0, 4));
	}
}
recommendSongList();
</script>

<template>
    <Header />
	<view class="my-container">
        <!-- <paddingTop></paddingTop> -->
        <loginBar v-if="userInfo.login"></loginBar>
        <notLoginBar v-else></notLoginBar>
        <tags />
        <view class="margin">
            <myLikeMusic></myLikeMusic>
            <view class="my-recommend-list">
                <songSheetCard
                    v-for="item in songSheet"
                    :key="item.id"
                    :sid="item.id"
                    :name="item.name"
                    :picUrl="item.picUrl || item.coverImgUrl"
                    :playCount="item.playCount || item.playcount"
                    @click="to_music_library(item.id)"
                ></songSheetCard>
            </view>
        </view>
    </view>
</template>

<style lang="less">
page {
	background-color: #eeeeee;
}

// 公共骨架盒子样式
.base-shelf {
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0px 0px 5px #cccccc;
	overflow: hidden;
}


.margin {
	margin: 0 20rpx;
}

.my-recommend-list {
	margin-top: 40rpx;
	display: flex;
    column-gap: 20rpx;
	flex-wrap: wrap;
	gap: 20rpx;
}

.news-songs {
	flex: 30%;

	.news-song-name {
		font-size: 22rpx;
		font-weight: 700;
	}

	.news-song-name,
	.news-songs-pic {
		width: 220rpx;
	}
}

.my-container {
    flex: 1;
    overflow: auto;
    padding-bottom: 120rpx;
}

page {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
}

</style>
