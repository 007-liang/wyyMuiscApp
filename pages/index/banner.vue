<script setup lang='ts'>
import { wxRequest } from '@/utils';
import { ref } from 'vue';

const banners = ref<IIndexBanner[]>([]);
const get_banner = async () => {
    let res = await wxRequest<IIndexBannerRes>({
        url: "/banner",
    });
    banners.value = res.data.banners
};
get_banner();

</script>

<template>
    <swiper
        indicator-dots
        circular
        autoplay
    >
        <swiper-item
            v-for="item in banners"
            :key="item.imageUrl"
        >
            <image
                class="swiper-item-pic"
                mode="widthFix"
                :src="item.imageUrl"
            />
        </swiper-item>
    </swiper>
</template>

<style scoped>
.swiper-item-pic {
    width: 100% !important;
}
</style>