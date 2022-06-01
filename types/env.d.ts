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



declare interface ILoginStatus extends CloudMusicRes, Partial<IUserInfo> {
    // 调用登录接口返回信息
    message?: string;
}

