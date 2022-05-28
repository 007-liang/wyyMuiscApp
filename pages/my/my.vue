<template>
	<view>
		我的
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onShow() {
			if (typeof this.getTabBar === 'function' && this.getTabBar()) {
		        this.getTabBar().setData({
		          selected: 1
		        })
		      }
		}
	}
</script>

<style lang="less">

</style>
