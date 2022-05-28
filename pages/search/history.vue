<template>
	<view class="search-history">
		历史
		<scroll-view class="search-history-tags">
			<view
				class="search-history-tag"
				v-for="item in history"
			>
				{{item}}
			</view>
		</scroll-view>
		
		<view class="search-history-del">
			
		</view>
	</view>
</template>

<script lang="ts">
import {
	getLocalStorage,
    search_history_localstorage
} from "../../utils";
export default {
	data() {
		let history = getLocalStorage(search_history_localstorage) || [
			"So Far Away",
			"A",
			"B",
			"C"
		];
		return {
			history
		}
	}
}
</script>

<style lang="less">
	.search-history {
		padding: 10px;
		display: flex;
		column-gap: 10px;
		align-items: center;
	}
	.search-history-tags {
		display: flex;
		gap: 14px;
		flex: 1;
		
		.search-history-tag {
			padding: 10px;
			background-color: #f2f2f2;
			border-radius: 4px;
		}
	}
</style>