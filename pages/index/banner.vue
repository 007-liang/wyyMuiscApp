<script setup lang='ts'>
import { wxRequest } from '@/utils';
import { ref } from 'vue';

const banners = ref([]);
const get_banner = async () => {
    let res = await wxRequest({
        url: "/banner",
    });
    console.log(res);
};
get_banner();

</script>

<template>

</template>