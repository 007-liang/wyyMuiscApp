export function getLocalStorage(key: string, is_parser: boolean = true) {
	return wx.getStorageSync(key);
}