<template>
	<view class="search-history">
		历史

        <view class="search-history-tagsbox">

            <view
                class="search-history-tags"
                scroll-x
            >
                <view
                    class="search-history-tag"
                    v-for="item in history"
                    :key="item"
                >
                    {{item}}
                </view>
            </view>

        </view>
		
		<view class="search-history-del iconfont">
			&#xe665;
		</view>
	</view>
</template>

<script lang="ts">
import {
	getLocalStorage,
    search_history_localstorage,
    wxRequest
} from "@/utils";
export default {
	data() {
		let history = getLocalStorage(search_history_localstorage) || [
			"So Far Away",
			"孤勇者",
			"反方向的钟",
			"C"
		];
		return {
			history
		}
	},
}
</script>

<style lang="less">
.search-history {
    padding: 10px;
    display: flex;
    column-gap: 10px;
    align-items: center;
    box-sizing: border-box;
}

.search-history-tagsbox {
    overflow: hidden;
    position: relative;
    flex: 1;
    &::after {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 60px;
        background: linear-gradient(
            90deg,
            rgba(255, 255, 255, .1),
            rgb(255, 255, 255)
        );
        // background-color: #333;
    }
}
.search-history-tags {
    display: flex;
    flex-wrap: nowrap;
    
    column-gap: 10px;
    // white-space: nowrap;
    overflow-x: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
    
    .search-history-tag {
        padding: 10px 12px;
        background-color: #f2f2f2;
        border-radius: 20px;
        white-space: nowrap;
        // display: inline-block;
        // margin-right: 10px;
    }
}

.search-history-del {
    font-size: 24px;
    color: #999;
}
</style>