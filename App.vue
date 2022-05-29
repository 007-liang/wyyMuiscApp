<script>
export default {
    onLaunch: function() {
        // console.log('App Launch')
    },
    onShow: function() {
        // console.log('App Show')
    },
    onHide: function() {
        // console.log('App Hide')
    }
}
</script>

<style>
/*每个页面公共css */
@font-face {
    font-family: 'iconfont';  /* Project id 3434140 */
    src: url('//at.alicdn.com/t/font_3434140_bot144ya9m.woff2?t=1653749261283') format('woff2'),
        url('//at.alicdn.com/t/font_3434140_bot144ya9m.woff?t=1653749261283') format('woff'),
        url('//at.alicdn.com/t/font_3434140_bot144ya9m.ttf?t=1653749261283') format('truetype');
}


page {
    font-family: 'Microsoft YaHei Light';
    font-size: 16px;
}

.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}

.left-gradient-background,
.right-gradient-background {
    content: "";
    position: absolute;
    top: 0;
    width: 100rpx;
    height: 100%;

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
</style>
