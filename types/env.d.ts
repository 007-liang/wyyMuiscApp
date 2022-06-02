/// <reference path="../node_modules/@dcloudio/types/index.d.ts"/>

interface CloudMusicRes {
    code: number,
}

declare interface IUserInfo {
    // 用户基本信息
    cookie: string;
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
    login: boolean;
}

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

declare interface IUserlv {
    // 用户等级
    info: string;
    level: number | string;
    nextLoginCount: number;
    userId: number;
    progress: number;
    nextPlayCount: number;
    nowLoginCount: number;
    nowPlayCount: number;
}



declare interface ILoginStatus extends CloudMusicRes, Partial<IUserInfo> {
    // 调用登录接口返回信息
    message?: string;
}

