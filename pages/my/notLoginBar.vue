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
	name:"loginStatus"
}
</script>

<style lang="less">
// 登录栏骨架
.login-bar {
	display: flex;
	padding: 40rpx 30rpx;
	align-items: center;
}

.login-name {
	padding-left: 15rpx;
	padding-right: 5rpx;
	font-size: 26rpx;
	font-weight: 700;
}

</style>