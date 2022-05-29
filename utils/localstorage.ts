export const getLocalStorage = (
    key: string
) => {
	return wx.getStorageSync(key);
};

export const setLocalStorage = <T extends string | object>(
    key: string,
    data: T
) => {
    wx.setStorageSync(key, data);
}