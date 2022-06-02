<script setup lang='ts'>
    
</script>

<template>
    <view class="loading-page">
        <loginLogo></loginLogo>
        <text>网抑云音乐</text>
    </view>
</template>

<style lang='less'>
page {
    width: 100vw;
    height: 100vh;
    background-color: #DB2C1F;
}

.loading-page {
    position: fixed;
    display: flex;
    top: 30%;
    left: 50%;
    height: 60%;
    flex-direction: column;
    justify-content: space-between;
    color: #ffffff;
    transform: translateX(-50%);
}

</style>
