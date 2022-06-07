declare interface ISongUrlData {
    id: number;
    br: number;
    code: number;
    gain: number;
    type: 'mp3';
    url: string;
    level: string;
}

/**
 * 当前播放歌曲信息
 */
declare interface IPlayingSong {
    id: number;
    name: string;
    /**
     * 作者
     */
    author: string;
    /**
     * 背景图URL
     */
    picUrl: string;
    currentTime: number;
    endTime: number;
    /**
     * 控制播放，并且会触发/销毁更新当前时间定时器
     */
    playing: boolean;
    /**
     * 播放进度
     */
    progress: number;
    showLyric: boolean;
    /**
     * 更新当前时间/进度定时器
     */
    timer: any;
}

/**
 * 源歌词对象
 */
interface ILyric {
    lyric: string;
    version: string;
}

/**
 * 解析后歌词对象
 */
declare type TParsedLyric = { 
    time: number; 
    text: string; 
    tText?: string; 
}[];

/**
 * 歌词数据
 */
declare interface ISongLyric {
    klyric: ILyric;
    /**
     * 主歌词数据
     */
    lrc: ILyric;
    tlyric: ILyric;
    qfy: boolean;
    sfy: boolean;
    sgc: boolean;
    transUser: {
        id: number;
        nickname: string;
    };
}

/**
 * 推荐歌曲
 */
declare interface IRSongSheet {
    id: number;
    copywriter: string;
    createTime: number;
    creator: {
        avatarUrl: string;
        backgroundUrl: string;
        description: string;
        detailDescription: string;
        nickname: string;
        signature: string;
    };
    name: string;
    picUrl: string;
    playcount: number;
    trackCount: number;
    userId: number;
}

/**
 * 排行榜数据
 */
declare interface ITopListData {
    // 歌手排行榜
    artistToplist: {
        coverUrl: string;
        name: string;
        position: number;
        upateFrequency: string;
    };
    list: ITopListDetail[]
}

/**
 * 排行榜数据详情
 */
declare interface ITopListDetail {
    ToplistType?: string;
    coverImgUrl: string;
    name: string;
    id: number;
    playCount: number;
    subscribedCount: number;
    trackCount: number;
    tracks?: null;
    tags: string[];
    createTime: number;
    description: string;
    updateFrequency: string;
    updateTime: number;
}

/**
 * 歌曲详情
 */
declare interface ISongDetail {
    // 歌曲详情
    al: {
        id: number;
        name: string;
        picUrl: string;
    };
    alia: []; // 别名
    ar: IAuthor;
    name: string;
    pop: number; // 歌曲热度
    dt: number;
}

/**
 * 歌手信息
 */
declare type IAuthor = { 
    alias: [],
    id: number;
    name: string;
}[];