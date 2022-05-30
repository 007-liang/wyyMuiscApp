/// <reference path="../node_modules/@dcloudio/types/index.d.ts"/>

interface CloudMusicRes {
    code: number,
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

declare interface ILoginStatus extends CloudMusicRes {
    // 调用登录接口返回信息
    message: string;
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