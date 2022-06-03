<script setup lang="ts">
import { forEach, wxRequest } from "@/utils";
import { ref } from "vue-demi";
import { getRecommendSongSheet } from "@/api";
import { useUserInfo } from "@/store";
import loginBar from './loginBar.vue'; // 已登录栏
import notLoginBar from './notLoginBar.vue'; // 未登录栏
import myLikeMusic from "./myLikeMusic.vue"; // 我喜欢的音乐栏

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
	<paddingTop></paddingTop>
	<loginBar v-if="userInfo.login"></loginBar>
	<notLoginBar v-else></notLoginBar>
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
			></songSheetCard>
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

// 登录栏骨架
.login-bar {
	display: flex;
	padding: 40rpx 30rpx;
	align-items: center;
}

.user-avatar {
	box-sizing: border-box;
	display: flex;
	width: 100rpx;
	height: 100rpx;
	padding-top: 15rpx;
	border-radius: 50%;
	border: 2rpx solid #FFFFFF;
	background-color: #F8F1F1;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	
	.iconfont {
		color: #F9D9D9;
		font-size: 90rpx;
	}
}

.login-name {
	padding-left: 15rpx;
	padding-right: 5rpx;
	font-size: 26rpx;
	font-weight: 700;
}

.margin {
	margin: 0 20rpx;
}

.my-recommend-list {
	margin-top: 40rpx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 20rpx;
}

.news-songs {
	flex: 30%;

	.news-song-name {
		font-size: 16rpx;
		font-weight: 700;
	}

	.news-song-name,
	.news-songs-pic {
		width: 220rpx;
	}
}
</style>
