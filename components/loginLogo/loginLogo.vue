<template>
	<view class="logo-box">
		<view class="logo-bg">
			<image
				class="logo"
				src="/static/音乐 (2).png" 
				mode="widthFix"
			></image>
			<view class="ripples-before"></view>
			<view class="ripples-after"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"loignLogo",
	}
</script>

<style lang="less">
.logo-box {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding-bottom: 20%;
}

.logo-bg {
	position: relative;
	width: 100rpx;
	height: 100rpx;
	padding: 20rpx;
	transform: rotateZ(20deg);
	background-color: #F22A25;
	border-radius: 50%;
	box-sizing: 0 0 10rpx #999999;
	
	.logo {
		width: 100%;
	}
}

/* 涟漪效果 */
@keyframes ripples {
	0% {
		opacity: 0;
	}
	
	20% {
		opacity: 0.2;
	}
	
	70% {
		border-color: #f1f1f1;
		opacity: 0.1;
	}
	
	100% {
		border-color: #eeeeee;
		opacity: 0;
		width: 400rpx;
		height: 400rpx;
	}
}

/* less混入 */
.baseStyle {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	border-width: 1rpx;
	border-color: transparent;
	border-style: solid;
	transform: translate(-50%, -50%);
	animation: ripples 5s infinite;
}

.ripples-before {
	.baseStyle();
	animation-delay: 0s;
}

.ripples-after {
	.baseStyle();
	animation-delay: 3s;
}

</style>