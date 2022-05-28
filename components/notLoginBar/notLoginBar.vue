<template>
	<navigator 
		url="/pages/login/login"
		open-type="navigate"
		hover-class="none"
		class="login-bar"
		animation-type="fade-in"
	>
		<view class="user-avatar">
			<i class="iconfont">&#xe7d5;</i>
		</view>
		<view> 
			<text class="login-name"> 立即登录 </text>
			<i class="iconfont">&#xe66b;</i>
		</view>
	</navigator>
</template>

<script lang="ts">
	export default {
		name:"loginStatus",
		data() {
			return {
				img: ''
			};
		},
		created() {
			
		}
	}
</script>

<style lang="less">
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
</style>