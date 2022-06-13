import { wxRequest } from "@/utils";

type TSongDetail = { songs: ISongDetail[] } & CloudMusicRes;
type TSongUrlData = { data: ISongUrlData[] } & CloudMusicRes;
/**
 * 获取歌曲详情(可获取多首)
 * @param ids 音乐ID 例如 getSongDetail(id1, id2)
 */
export const getSongDetail = (...ids: number[] | number[][]) => {
    if (Array.isArray(ids[0])) {
        ids = ids[0];
    }
    return wxRequest<TSongDetail>({
        url: '/song/detail',
        data: {
            ids: ids.toString(),
        } 
    });
};

export const getSongUrl = (id: number) => {
    return wxRequest<TSongUrlData>({
        url: '/song/url',
        data: { id },
    });
};