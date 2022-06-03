<template>
	<logo></logo>
    <view class="login-phone-box">
        <loginForm></loginForm>
    </view>
</template>

<script setup lang='ts'>
import logo from '@/components/logo/loginLogo.vue';
import loginForm from './loginForm.vue';
</script>

<style lang='less'>
page {
	padding-top: 20%;
	background-color: #DB2C1F;
}
</style>
