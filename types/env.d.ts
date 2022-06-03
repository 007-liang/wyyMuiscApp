/// <reference path="../node_modules/@dcloudio/types/index.d.ts"/>

interface CloudMusicRes {
    code: number,
}

// 推荐歌曲
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

// 排行榜数据
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

// 排行榜数据详情
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

// 歌曲详情
declare interface ISongDetail {
    // 歌曲详情
    al: {
        id: number;
        name: string;
        picUrl: string;
    };
    alia: []; // 别名
    ar: { 
        // 歌手信息
        alias: [],
        id: number;
        name: string;
    }[];
    name: string;
    pop: number; // 歌曲热度
    dt: number;
}
