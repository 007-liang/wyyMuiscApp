/// <reference path="../node_modules/@dcloudio/types/index.d.ts"/>

interface CloudMusicRes {
    code: number;
}

interface ISearchHotData {
    first: string;
    second: number;
    third: number;
    iconType: number;
}

declare interface ISearchHot extends CloudMusicRes {
    result: {
        hots: ISearchHotData[]
    }
}

declare interface ILoginStatus {
    code: number;
    message: string;
}