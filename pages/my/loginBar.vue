<script setup lang="ts">
import { getUserLevel } from "@/api";
import { useUserInfo } from "@/store";

const userStore = useUserInfo();
const userInfo = userStore.userInfo;
const userLv = userStore.userLv;
const profile = userInfo.profile;

const getUserLv = async () => {
	const { data } = await getUserLevel();
	if (data.code === 200 && data.data) {
		userStore.setUserLv(data.data);
	}
	return 0;
};

getUserLv();
</script>

<template>
	<navigator 
		url="/pages/my/my"
		open-type="navigate"
		hover-class="none"
		class="login-bar"
		animation-type="fade-in"
	>
		<view class="row">
			<view 
				v-if="profile.defaultAvatar" 
				class="user-avatar"
			>
				<i class="iconfont">&#xe7d5;</i>
			</view>
			<image 
				v-else 
				class="user-avatar" 
				:src="profile.avatarUrl + '?param=50y50'"
				mode="scaleToFill"
			/>
			<view class="login-name"> 
				<text class="nickname"> 
					{{ profile.nickname }} 
				</text>
				<navigator 
					url="/pages/my/my"
					open-type="navigate"
					hover-class="none"
					class="lv"
					:hover-stop-propagation="true"
					animation-type="fade-in"
				>
					Lv: {{ userLv.level }}
				</navigator>
			</view>
		</view>
		<i class="iconfont">&#xe66b;</i>
	</navigator>
</template>

<style lang="less">
.login-bar {
	display: flex;
	padding: 40rpx 30rpx;
	align-items: center;
}
.user-avatar {
	padding: 0;
	border: none;
}

.nickname {
	font-size: 30rpx;
}

.lv {
	box-sizing: border-box;
	width: 60rpx;
	padding: 5rpx;
	margin-top: 10rpx;
	background-color: #fff;
	border-radius: 40rpx;
	text-align: center;
	font-size: 16rpx;
}

.row {
	display: flex;
	align-items: center;
}

.login-bar {
	justify-content: space-between;
}
</style>