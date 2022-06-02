import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const userInfo = reactive<
    Partial<IUserInfo>
>({
    login: false,
    cookie: '',
});

export const useUserInfo = defineStore('user-info', () => {
    const userLv = reactive<Partial<IUserlv>>({
        level: '--'
    });
    const userLikeIdList = reactive<number []>([]);
    const setUserInfo = (data: IUserInfo) => {
        userInfo.login = true;
        userInfo.cookie = data.cookie;
        userInfo.account = data.account;
        userInfo.profile = data.profile;
    };
    const setUserLv = (data: Partial<IUserlv>) => {
        let key: keyof Required<IUserlv>;
        for (key in data) {
            userLv[key] = data[key] as any;
        }
    };
    const setIdList = (ids: number[]) => userLikeIdList.push(...ids);
    return {
        userInfo,
        userLv,
        userLikeIdList,
        setUserLv,
        setUserInfo,
        setIdList,
    };
});