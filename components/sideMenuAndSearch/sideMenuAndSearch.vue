<template>
	<!-- 侧边菜单和搜索框 -->
	<view :style="{ height: statusBarHight }"></view>
	<view> 搜索 </view>
</template>

<script>
	export default {
		name:"sideMenuAndSearch",
		data() {
			return {
				statusBarHight: 0,
			};
		},
		created() {
			this.statusBarHight = uni.getSystemInfoSync().statusBarHeight;
		}
	}
</script>

<style lang="less">

</style>