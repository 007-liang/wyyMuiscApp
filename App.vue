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
		font-family: 'iconfont';
		/* project id 3434140 */
		src: url('');
		src: url('?#iefix') format('embedded-opentype'),
			url('//at.alicdn.com/t/font_3434140_od0bcfeygf.woff2') format('woff2'),
			url('//at.alicdn.com/t/font_3434140_od0bcfeygf.woff') format('woff'),
			url('//at.alicdn.com/t/font_3434140_od0bcfeygf.ttf') format('truetype'),
			url('#iconfont') format('svg');
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
