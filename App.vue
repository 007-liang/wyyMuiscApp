<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@font-face {
        font-family: 'iconfont';  /* Project id 3434140 */
        src: url('//at.alicdn.com/t/font_3434140_0az4xidsfikk.woff2?t=1653746996991') format('woff2'),
            url('//at.alicdn.com/t/font_3434140_0az4xidsfikk.woff?t=1653746996991') format('woff'),
            url('//at.alicdn.com/t/font_3434140_0az4xidsfikk.ttf?t=1653746996991') format('truetype');
    }

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
