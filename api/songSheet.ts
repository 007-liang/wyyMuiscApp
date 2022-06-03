import { wxRequest } from "@/utils";
import { userInfo as data } from "@/store";

type RecommendRes = { recommend: IRSongSheet[] } & CloudMusicRes;
export const getRecommendSongSheet = () => {
    return wxRequest<RecommendRes>({
        url: '/recommend/resource',
        data: {
            cookie: data.cookie,
        },
    });
};