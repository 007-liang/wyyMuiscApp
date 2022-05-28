<template>
	<view class="content">
		<sideMenuAndSearch></sideMenuAndSearch>
		<text>Holle World</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onShow() {
			if (typeof this.getTabBar === 'function' &&
		        this.getTabBar()) {
		        this.getTabBar().setData({
		          selected: 0
		        })
		      }
		},
	}
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>
