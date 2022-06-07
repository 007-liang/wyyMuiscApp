export * from "./localstorage";
export * from "./symbols";
export * from "./request"

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

type TCallBack<T> = (item: T, key: number) => boolean | void;
export const forEach = <T>(list: T[], cb: TCallBack<T>) => {
    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        let result = cb.call(list, item, i);
        if (result) break;
    }
};

export const parseAuthors = (authors: IAuthor) => {
    let result = ``;
    authors && authors.forEach(
        (item) => result += `/${item.name}`
    );
    return result.slice(1);
};

const parseSongTime = (
    branch: string, 
    second: string,
    millisecond: string,
) => {
    let num = 0;
    let br = parseFloat(branch);
    let sc = parseFloat(second);
    if (br) {
        num += br * 60;
    }
    if (sc) {
        num += sc; 
    }
    return num + (+millisecond / 1000);
};
export const parseLyricData = (lyric: string, tlyric?:string) => {
    const result: TParsedLyric = [];
    const timeReg = /^(\[(\d+):(\d+)\.(\d+)\])(.+)?$/;
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
        time = parseSongTime(data[2], data[3], data[4]);
        text = data[5]?.trim() || '';
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
        index = lastIndex;
    }
    return result;
};

/**
 * 74 -> 01:14
 */
export const numToDateFormat = (num: number) => {
    let minute: any = Math.floor(num / 60);
    let second: any = Math.floor((num / 60 - minute) * 60);
    minute < 9 ? minute = '0' + minute : null;
    second < 9 ? second = '0' + second : null
    return `${minute}:${second}`;
};

// lry
// "[00:00.000] 作词 : Justin Tranter/Julia Michaels/Justin Bieber/Michael Diamond
// [00:01.000] 作曲 : Justin Tranter/Julia Michaels/Justin Bieber/Michael Diamond
// [00:03.17]I was wonderin' 'bout your mama
// [00:07.67]Did she get that job she wanted?
// [00:12.07]Sold that car that gave her problems
// [00:16.81]I'm just curious 'bout her, honest
// [00:21.16]Girl, you wonderin' why I've been callin'?
// [00:25.80]Like I've got ulterior motives
// [00:30.48]No, we didn't end this so good
// [00:35.00]But you know we had something so good
// [00:38.23]So I'm wondering, can we still be friends? (oh-oh)
// [00:45.57]Can we still be friends? (oh-oh)
// [00:49.85]Doesn't have to end
// [00:54.33]And if it ends, can we be friends?
// [01:05.20]Can we be friends?
// [01:14.27]Can we be friends?
// [01:16.24]Wonderin' if you got a body
// [01:20.61]To hold you tight since I left
// [01:25.32]Wonderin' if you think about me
// [01:29.82]Actually, don't answer that
// [01:34.30]Girl, you wonderin' why I've been callin'?
// [01:39.06]Like I've got ulterior motives
// [01:43.40]No, we didn't end this so good
// [01:48.29]But you know we had something so good
// [01:51.47]So I'm wondering, can we still be friends? (oh-oh)
// [01:58.57]Can we still be friends? (oh-oh)
// [02:03.05]Doesn't have to end
// [02:06.83]And if it ends, can we be friends?
// [02:18.37]Can we be friends?
// [02:25.97]And if it ends, can we be friends?
// [02:28.71]Girl, you wonderin' why I've been callin'?
// [02:33.89]Like I've got ulterior motives
// [02:38.45]No, we didn't end this so good
// [02:42.19]But you know we had something so good
// [02:46.24]So I'm wondering, can we still be friends? (oh-oh)
// [02:53.73]Can we still be friends? (oh-oh)
// [02:58.01]Doesn't have to end
// [03:02.08]And if it ends, can we be friends?
// "
// // tlyric
// "[by:molliebieber]
// [00:03.17]我一直在担心你母亲的近况
// [00:07.67]她得到了她想要的工作吗
// [00:12.07]卖了那辆麻烦的车
// [00:16.81]说实话 我只是好奇而已
// [00:21.16]亲爱的 你很奇怪我为什么一直打电话给你吗
// [00:25.80]就像我别有用心一样
// [00:30.48]是的 我们的结局不尽如人意
// [00:35.00]但是你知道的 我们之间有过很多美好
// [00:38.23]所以我在想 我们还能做朋友吗
// [00:45.57]我们还能做朋友吗
// [00:49.85]其实我们不一定非得分手
// [00:54.33]但如果挽回不了 我们还能做朋友吗
// [01:05.20]我们还能做朋友吗
// [01:14.27]我们还能做朋友吗
// [01:16.24]我在想你是否有了新欢
// [01:20.61]他能在我离开之后拥你入睡
// [01:25.32]我在想你是否还念着我
// [01:29.82]好吧 还是不要回答了
// [01:34.30]亲爱的 你很奇怪我为什么一直打电话给你吗
// [01:39.06]就像我别有用心一样
// [01:43.40]是的 我们的结局不尽如人意
// [01:48.29]但是你知道的 我们之间有过很多美好
// [01:51.47]所以我在想 我们还能做朋友吗
// [01:58.57]我们还能做朋友吗
// [02:03.05]其实我们不一定非得分手
// [02:06.83]但如果挽回不了 我们还能做朋友吗
// [02:18.37]我们还能做朋友吗
// [02:25.97]但如果挽回不了 我们还能做朋友吗
// [02:28.71]亲爱的 你很奇怪我为什么一直打电话给你吗
// [02:33.89]就像我别有用心一样
// [02:38.45]我们的结局不尽如人意
// [02:42.19]但是你知道的 我们之间有过很多美好
// [02:46.24]所以我在想 我们还能做朋友吗
// [02:53.73]我们还能做朋友吗
// [02:58.01]其实我们不一定非得分手
// [03:02.08]但如果挽回不了 我们还能做朋友吗
// "