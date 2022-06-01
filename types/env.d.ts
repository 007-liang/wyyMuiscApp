/// <reference path="../node_modules/@dcloudio/types/index.d.ts"/>

interface CloudMusicRes {
    code: number,
}

declare interface IUserInfo {
    cookie: string;
    token: string;
    profile: {
        avatarUrl: string;
        backgroundUrl: string;
        defaultAvatar: boolean;
        nickname: string;
        userId: number;
        gender: 0 | 1;
        follows: number;
        followed: boolean;
        followeds: boolean;
        playlistCount: number;
        province: number;
        city: number;
        playlistBeSubscribedCount: number;
    };
    account: {
        id: number;
        createTime: number;
    };
    loginType: number;
}

interface ISearchHotData {
    // 热搜关键词
    alg: string,
    content: string,
    iconType: number
    iconUrl: string,
    score: number
    searchWord: string,
    source: number
    url: string
}

declare interface ILoginStatus extends CloudMusicRes, Partial<IUserInfo> {
    // 调用登录接口返回信息
    message?: string;
}

declare interface ISearchHot extends CloudMusicRes {
    // 热搜关键词
    result: {
        hots: ISearchHotData[]
    },
    data: ISearchHotData[]
}

declare interface INewsMusicArtists {
    // 最新单曲 歌手
    name: string,
    id: number,
}

declare interface INewsMusicData {
    // 最新单曲 数据
    name: string,
    id: number,
    picUrl: string,
    song: {
        name: string,
        id: number,
        artists: INewsMusicArtists[]
        album: {
            name: string,
            type: string,
            id: number
        }
    }
}

declare interface INewsMusic extends CloudMusicRes {
    // 最新单曲
    category: number;
    result: INewsMusicData[]
}

declare interface INewsHotSingsSing {
    // 热门歌手 歌手信息
    name: string,
    id: number,
    picId: number,
    img1v1Id: number,
    alias: string[],
    picUrl: string,
}

declare interface INewsHotSings extends CloudMusicRes {
    // 热门歌手
    more: boolean,
    artists: INewsHotSingsSing[]
}

declare interface ISearchKeyWordMatch {
    alg: string,
    feature: string,
    keyword: string,
    type: string,
    lastKeyword: string,
}
declare interface ISearchKeyword extends CloudMusicRes {
    // 搜索匹配的关键字
    result: {
        allMatch: ISearchKeyWordMatch[]
    }
}

declare interface ISearchDetailSongsRes {
    name: string,
    al: {
        name: string,
    },
    ar: {name: string}[]
}
declare interface ISearchDetailRes extends CloudMusicRes {
    result: {
        songCount: number,
        songs: ISearchDetailSongsRes
    }
}

// 搜索页歌单
declare interface IsearchDetailSonglists {
    name: string, // 歌单名字
    coverImgUrl: string, // 歌单图片
    creator: {
        nickname: string, // 创建者名字
    },
    trackCount: number, // 歌单歌曲数量
    playCount: number, // 播放次数
}


declare interface IsearchDetialSonglistRes extends CloudMusicRes {
    playlists: {

    }
}

declare interface IIndexNewSongsResult {
    name: string,
    picUrl: string,
    playCount: number,
    trackCount: number,
    id: number,
}
declare interface IIndexNewSongs extends CloudMusicRes {
    result: IIndexNewSongsResult[]
}