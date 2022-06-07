<script lang="ts">
import { getLocalStorage } from './utils';
import { useUserInfo } from './store';
import { getLoginStatus } from './api';

export default {
    async onLaunch() {
        // 凭借本地 cookie 实现自动登录
        const cookie = getLocalStorage('cookie') as string;
        const storeUserInfo = useUserInfo();
        let { 
            data: { 
                data 
            } 
        } = await getLoginStatus(cookie);
        if (
            data.code === 200 && 
            data.profile !== null && 
            !isNaN(data.profile.userId)
        ) {
            data.cookie = cookie;
            storeUserInfo.setUserInfo(data);
        }
    },
    onShow: function() {
        // console.log('App Show')
    },
    onHide: function() {
        // console.log('App Hide')
    }
}
</script>

<style lang="less">
@import './component.less';
/*每个页面公共css */

@font-face {
  font-family: 'iconfont';  /* Project id 3434140 */
  src: url('//at.alicdn.com/t/font_3434140_7mmr28816b.woff2?t=1654568716514') format('woff2'),
       url('//at.alicdn.com/t/font_3434140_7mmr28816b.woff?t=1654568716514') format('woff'),
       url('//at.alicdn.com/t/font_3434140_7mmr28816b.ttf?t=1654568716514') format('truetype');
}

.user-avatar {
	box-sizing: border-box;
	display: flex;
	width: 100rpx;
	height: 100rpx;
	padding-top: 15rpx;
	border-radius: 50%;
	border: 2rpx solid #FFFFFF;
	background-color: #F8F1F1;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	
	.iconfont {
		color: #F9D9D9;
		font-size: 90rpx;
	}
}

.section {
    margin: 20rpx 0;
    background-color: white;
}

page {
    font-family: 'Microsoft YaHei Light';
    font-size: 16px;
}

.text-hidden {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.scrollbar-none {
    &::-webkit-scrollbar {
        display: none;
    }
}

.ellipsis {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.iconfont {
	display: inline-block;
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}

// 左右侧 渐变 渐隐渐现内容
.left-gradient-background,
.right-gradient-background {
    content: "";
    position: absolute;
    top: 0;
    width: 100rpx;
    height: 100%;
    pointer-events: none;
}

.left-gradient-background {
    left: -2rpx;
    background: linear-gradient(
        -90deg,
        rgba(255, 255, 255, .0),
        rgb(255, 255, 255)
    );
}

.right-gradient-background {
    right: -2rpx;
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, .0),
        rgb(255, 255, 255)
    );
}

// 歌单图片背景
.music-library-bg {
    position: fixed;
    z-index: -2;
    top: 0;
    left: 0;
    width: 100%;
}
// 歌单图片背景模糊
.music-library-filter {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, .4);
    backdrop-filter: blur(120rpx);
}

// 主题红
// @theme-color: #DB2C1F;

// 圆角边框
// @border-radius: 8px;

// 图标背景渐变颜色 (default是默认颜色)
// @iconfont-default: #CFCFCF;
// @iconfont-shallow: #FF9090;
// @iconfont-deep: #FF3A3A;

// 导航栏下划线渐变颜色
// @nav-line-start: #FF3C3C;
// @nav-line-end: #FCA2A2;
</style>
