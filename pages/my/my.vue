<script setup lang="ts">
import { useUserInfo } from "@/store";

const userInfo = useUserInfo().userInfo;
</script>

<template>
	<paddingTop></paddingTop>
	<loginBar v-if="userInfo.login"></loginBar>
	<notLoginBar v-else></notLoginBar>
	<view class="margin">
		<myLikeMusic></myLikeMusic>
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
</style>
