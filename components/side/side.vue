<script setup lang='ts'>
import { useUserInfo } from '@/store';
import { wxRequest } from '@/utils';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import SideItem from './side-item.vue';

const props = defineProps<{
    style?: object,
}>();

const show = ref(true);

const userStore = useUserInfo();
const toLogin = () => {
    if (!userStore.userInfo.login) {
        wx.navigateTo({
            url: "/pages/login/login"
        })
    }
};
</script>

<template>
    <text
        class="side iconfont"
        @click="show = true"
        :style="props.style"
    >
        &#xe67a;
    </text>
    <sider
        v-model:show="show"
        width="660rpx"
        background-color="#eee"
    >

        <view
            class="side-user"
            @click="toLogin"
        >
            <template v-if="userStore.userInfo.login">
                <image
                    :src="userStore.userInfo.profile.avatarUrl"
                />

                {{userStore.userInfo.profile.nickname}}
            </template>
            <template v-else>
                <view class="user-avatar">
                    <text class="iconfont">
                        &#xe7d5;
                    </text>
                </view>

                立即登录

                <text class="iconfont">
                    &#xe66b;
                </text>
            </template>
        </view>
        <view class="section">
            <SideItem
                :style="borderBottom"
                title="我的消息"
                border-bottom
            />

            <SideItem
                title="云贝中心"
                subtitle="做任务赚云贝"
            />
        </view>
        
        <view class="section">
            <view class="side-item-title">
                音乐服务
            </view>

            <SideItem
                title="云村有票"
            />

            
            <SideItem
                title="商城"
                subtitle="618火爆抢购中"
            />

            <SideItem
                title="游戏专区"
            />

            
            <SideItem
                title="口袋彩铃"
                subtitle="5月榜单来袭"
            />
        </view>

        <view class="section">
            <view class="side-item-title">
                其他
            </view>

            <SideItem
                title="设置"
            />

            
            <SideItem
                title="夜间模式"
                :showRightIcon="false"
            >
                <template #subtitle>
                    <switch></switch>
                </template>    
            </SideItem>

            <SideItem
                title="定时关闭"
            />

            <SideItem
                title="个性装扮"
            />

            <SideItem
                title="边听边存"
                subtitle="未开启"
            />
            
            <SideItem
                title="在线听歌免流量"
            />
            
            <SideItem
                title="音乐黑名单"
            />
            
            <SideItem
                title="青少年模式"
                subtitle="未开启"
            />
            
            <SideItem
                title="音乐闹钟"
            />
        </view>

        <view class="section">
            <SideItem
                title="我的订单"
            />
            
            <SideItem
                title="优惠券"
            />
            
            <SideItem
                title="我的客服"
            />
            
            <SideItem
                title="分享网抑云音乐"
            />
            
            <SideItem
                title="关于"
            />
        </view>

        <view class="footer"></view>
    </sider>
</template>

<style lang="less" scoped>
.side-item-title {
    padding: 30rpx;
    font-size: 28rpx;
    color: #999;
    border-bottom: 2rpx solid #d2d2d2
}

.side-user {
    margin: 40rpx;
    display: flex;
    align-items: center;
    font-size: 36rpx;
    column-gap: 20rpx;
}

.user-avatar {
    width: 80rpx;
    height: 80rpx;

    .iconfont {
        font-size: 60rpx;
    }
}

.footer {
    margin-bottom: 120rpx;
}

.side {
    font-size: 46rpx;
    padding: 10rpx;
}


.section {
    margin: 40rpx;
    background-color: #f9f9f9;
    padding: 0rpx;
}
</style>