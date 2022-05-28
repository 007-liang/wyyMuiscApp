<template>
	<view class="search-box">
        <text class="iconfont">&#xe68d;</text>
		<input type="text" placeholder="搜索内容" class="">
	</view>
	<history />
    <hot />
</template>

<script lang="ts">
import history from "@/pages/search/history.vue";
import hot from "@/pages/search/hot.vue";
export default {
    components: {
        history,
        hot
    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style scoped lang="less">
	.search-box {
		display: flex;
        align-items: center;
        column-gap: 10px;
        
        .iconfont {
            margin-left: 10px;
            font-size: 16px;
        }
	}

	input {
		padding: 10px;
		border-bottom: 1px solid #ddd;
		flex: 1;
        margin-right: 10px;
	}
</style>
