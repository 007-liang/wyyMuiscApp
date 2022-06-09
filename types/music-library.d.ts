declare interface IMusicLibrarySubscribersRes {
    
}
declare interface IMusicLibraryTrackIdsRes {
    id: number,
    uid: number,
}

declare interface IMusicLibraryAllRes extends CloudMusicRes {
    songs: IMusicDetail[]
}

declare interface IMusiceLibraryRes extends CloudMusicRes {
    playlist: {
        name: string,
        coverImgUrl: string,
        description: string,
        tags: string[],
        playCount: number,
        id: number,
        subscribers: IMusicLibrarySubscribersRes[]
        trackIds: IMusicLibraryTrackIdsRes[],
        tracks: IMusicDetail[],
        creator: {
            nickname: string,
            avatarUrl: string,
        },
        /**
         * @description 分享数
         */
        shareCount: number,

        /**
         * @description 收藏数
         */
        subscribedCount: number,

        /**
         * @description 评论数
         */
        commentCount: number,

        /**
         * 0 免费
         * 1 VIP
         * 2 购买专辑
         * 8 非VIP可免费播放低音质
         * 
         * 1 & 8 都可以购买单曲
         */
        fee: number,

        /**
         * 视频mv id, 为0是没有
         */
        mv: number
    }
}

declare interface IPlayingLibrary {
    id: number;
    list: IMusicDetail[];
}