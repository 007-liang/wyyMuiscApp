<script lang="ts">
import { useUserInfo } from './store';
import { getLocalStorage, wxRequest } from './utils';

type TUserInfo = {
    data: CloudMusicRes & IUserInfo;
};
export default {
    async onLaunch() {
        // 凭借本地cookie实现自动登录
        const storeUserInfo = useUserInfo();
        const cookie = getLocalStorage('cookie');
        const { 
            data: { 
                data 
            } 
        } = await wxRequest<TUserInfo>({
            url: '/login/status',
            data: { cookie },
        });
        if (
            data.code === 200 && 
            data.profile !== null && 
            !isNaN(data.profile.userId)
        ) {
            storeUserInfo.setUserInof(data);
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
    src: url('//at.alicdn.com/t/font_3434140_1ux1h6h5f5r.woff2?t=1654261750018') format('woff2'),
        url('//at.alicdn.com/t/font_3434140_1ux1h6h5f5r.woff?t=1654261750018') format('woff'),
        url('//at.alicdn.com/t/font_3434140_1ux1h6h5f5r.ttf?t=1654261750018') format('truetype');
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
	
// 主题红
@theme-color: #DB2C1F;

// 圆角边框
@border-radius: 8px;

// 图标背景渐变颜色 (default是默认颜色)
@iconfont-default: #CFCFCF;
@iconfont-shallow: #FF9090;
@iconfont-deep: #FF3A3A;

// 导航栏下划线渐变颜色
@nav-line-start: #FF3C3C;
@nav-line-end: #FCA2A2;
</style>
