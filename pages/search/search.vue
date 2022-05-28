<template>
	<view class="search-box">
		<input type="text" placeholder="搜索内容" class="">
	</view>
	<history />
</template>

<script>
	import history from "@/pages/search/history.vue";
	export default {
		components: {
			history
		},
		data() {
			return {

			}
		},
		setup(context) {
			
		},
		methods: {

		}
	}
</script>

<style scoped>
	.search-box {
		display: flex;
	}

	input {
		padding: 10px;
		border-bottom: 1px solid #ddd;
		flex: 1;
	}
</style>
