import { 
    userInfo as data 
} from '@/store';
import { wxRequest } from "@/utils";

/**
 * 获取歌曲详情(可获取多首)
 * @param ids 音乐ID 例如 getSongDetail(id1, id2)
 */
export const getSongDetail = <
    T extends string | ArrayBuffer | object
>(...ids: number[]) => {
    return wxRequest<T>({
        url: '/song/detail',
        data: {
            ids: ids.toString(),
        } 
    });
};
