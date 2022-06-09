import { setIndex } from "@/store";

export * from "./localstorage";
export * from "./symbols";
export * from "./request";
export * from "./navigateTo";

/**
 * @description 跳转到歌单页面
 * @param id 歌单id
 */


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
 * @param song 歌曲歌手
 */
export const get_song_ar = (song: IMusicDetail) => {
    return song.ar.reduce((names, item) => {
        names.push(item.name);
        return names;
    }, [] as string[])
}


type TCallBack<T> = (item: T, key: number) => any;
export const forEach = <T>(list: T[], cb: TCallBack<T>) => {
    if (!Array.isArray(list)) return; 
    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        let result = cb.call(list, item, i);
        if (result) break;
    }
};
/**
 * 格式化作者 xxx/xxx
 * @param authors 作者
 * @returns 
 */
export const parseAuthors = (authors: IAuthor) => {
    let result = ``;
    forEach(authors, 
        (item) => result += `/${item.name}`
    );
    return result.slice(1);
};
/**
 * 解析歌词时间 => 15
 * @param b 分
 * @param s 秒
 * @param ms 毫秒 
 * @returns 
 */
const parseSongTime = (
    b: string, 
    s: string,
    ms: string,
) => {
    let num = 0;
    let br = parseFloat(b);
    let sr = parseFloat(s);
    if (br) {
        num += br * 60;
    }
    if (sr) {
        num += sr; 
    }
    return num + (+ms / 1000);
};
/**
 * 解析歌词数据
 * @param lyric 源歌词
 * @param tlyric 译文歌词
 * @returns 
 */
export const parseLyricData = (lyric: string, tlyric?:string) => {
    const result: TParsedLyric = [];
    const timeReg = /^(\[(\d+):(\d+)\.(\d+)\])+(.+)?$/;
    let index = 0,
        lastIndex = 0,
        tIndex = 0,
        tLastIndex = 0,
        data: any,
        chunk = '',
        time = 0,
        tText = '',
        text = '';

    while (lastIndex <= lyric.length) {
        // 源歌词的解析
        lastIndex = lyric.indexOf('\n', lastIndex + 1);
        if (lastIndex === -1) break;
        chunk = lyric.slice(index, lastIndex).trim();
        data = timeReg.exec(chunk)!
        index = lastIndex;
        if (data === null) continue; // 预防未知错误
        time = parseSongTime(data[2], data[3], data[4]);
        text = data[5]?.trim() || '';
        if (!text) continue;
        if (tlyric) { // 对译文歌词解析
            tIndex = tlyric.indexOf(data[1], tLastIndex);
            if (tIndex !== -1) {
                tLastIndex =  tlyric.indexOf('\n', tIndex + 1);
                tText = tlyric.slice(tIndex + data[1].length, tLastIndex);
            }
        }
        result.push({
            time,
            text,
            tText:  tText,
        });
    }
    return result;
};

/**
 * 数字转时间 74 -> 01:14
 */
export const numToDateFormat = (num: number) => {
    let minute: any = Math.floor(num / 60);
    let second: any = Math.floor((num / 60 - minute) * 60);
    minute < 9 ? minute = '0' + minute : null;
    second < 9 ? second = '0' + second : null
    return `${minute}:${second}`;
};

/**
 * 设置当前播放项在索引位置
 */
export const setStateIndex = (
    index: number, 
    maxIndex: number, 
    isNext: boolean
) => {
    if (isNext) {
        if (index === maxIndex) {
            setIndex(0);
        } else {
            setIndex(++index)
        }
    } else {
        if (index === 0) {
            setIndex(maxIndex)
        } else {
            setIndex(--index)
        }
    }
};