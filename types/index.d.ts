
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

// 首页推荐歌单
declare interface IIndexNewSongsResult {
    name: string,
    picUrl: string,
    playCount: number,
    trackCount: number,
    id: number,
}
// 首页推荐歌单
declare interface IIndexNewSongs extends CloudMusicRes {
    result: IIndexNewSongsResult[]
}

// 首页轮播图
interface IIndexBanner {
    imageUrl: string,
}
// 首页轮播图
declare interface IIndexBannerRes extends CloudMusicRes {
    banners: IIndexBanner[]
}

// 首页独家放送
declare interface IIndexExclusiveBroadcastResult {
    name: string,
    picUrl: string,
    sPicUrl: string,
}
// 首页独家放送
declare interface IIndexExclusiveBroadcastRes extends CloudMusicRes {
    result: IIndexExclusiveBroadcastResult[]
}