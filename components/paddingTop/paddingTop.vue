<template>
	<!-- 手机状态栏的间隔 -->
	<view :style="{ height: `${statusBarHight}rpx` }"></view>
</template>

<script lang="ts">
	export default {
		name:"paddingTop",
		data() {
			return {
				statusBarHight: 0,
			}
		},
		created() {
			this.statusBarHight = uni.getSystemInfoSync().statusBarHeight * 2;
		}
	}
</script>

<style>

</style>