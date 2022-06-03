// 用户基本信息
declare interface IUserInfo {
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

// 用户等级
declare interface IUserlv {
    info: string;
    level: number | string;
    nextLoginCount: number;
    userId: number;
    progress: number;
    nextPlayCount: number;
    nowLoginCount: number;
    nowPlayCount: number;
}

// 调用登录接口返回信息
declare interface ILoginStatus 
    extends CloudMusicRes, Partial<IUserInfo> {
    message?: string;
}