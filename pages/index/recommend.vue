<script setup lang='ts'>
import { wxRequest } from "@/utils";
import Header from "./components/list-header.vue";
wxRequest({
    url: "/album/list"
}).then(res => {
    console.log(res.data);
})
</script>

<template>
    <view class="recommend section">
        <Header>
            <template #title>
                
            </template>
        </Header>
    </view>
</template>