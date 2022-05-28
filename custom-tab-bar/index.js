Component({
	data: {
		selected: 0,
		list: [{
			index: 0,
			pagePath: "/pages/index/index",
			iconPath: "/static/雷达 (2).png",
			selectedIconPath: "/static/雷达 (3).png",
			text: "首页"
		}, {
			index: 1,
			pagePath: "/pages/my/my",
			iconPath: "/static/home.png",
			selectedIconPath: "/static/home (1).png",
			text: "我的"
		}]
	},
	ready() {
		const path = getCurrentPages()[0].route;
		switch (path) {
			case 'pages/index/index':
				this.setSelected(0);
				break;
			case 'pages/my/my':
				this.setSelected(1);
		}
	},
	methods: {
		setSelected(index) {
			this.setData({
				selected: index,
			});
		}
	},
});
