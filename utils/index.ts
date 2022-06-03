export * from "./localstorage";
export * from "./symbols";
export * from "./request"

/**
 * @description 跳转到歌单页面
 * @param id 歌单id
 */
export const to_music_library = (id: string) => {
    wx.navigateTo({
        url: `/pages/music-library/music-library?id=${id}`
    })
}

let num_unit = [
    "",
    "",
    "",
    "",
    "",
    "万",
    "万",
    "万",
    "万",
    "亿",
    "亿",
    "亿",
    "亿",
]
export const transform_num_unit = (num: number) => {
    if (isNaN(num)) {
        return;
    };
    let str = num.toString();
    let index = str.length > 4 ? str.length % 4 : str.length;
    let result: (string | number)[] = [];
    if (index === 0 && str.length >= 4) {
        index = 4;
    };
    let unit = num_unit[str.length];
    result.push(str.slice(0, index))
    if (unit === "万") {
        let float_num = parseInt(str.slice(index, index + 1));
        if (float_num > 0) {
            result.push(float_num)
        };
    };
    return result.join(".") + unit;
};

/**
 * 获取歌曲
 * @param song 歌曲详情
 */
export const get_song_ar = (song: IMusicDetail) => {
    return song.ar.reduce((names, item) => {
        names.push(item.name);
        return names;
    }, [] as string[])
}


type TCallBack<T> = (item: T, key: number) => boolean | undefined;
export const forEach = <T>(list: T[], cb: TCallBack<T>) => {
    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        let result = cb.call(list, item, i);
        if (result) break;
    }
};
