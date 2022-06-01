import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useUserInfo = defineStore('user-info', () => {
    const state = reactive({} as IUserInfo);
    const setUserInof = (userInfo: IUserInfo) => {
        state.account = userInfo.account;
        state.loginType = userInfo.loginType;
        state.profile = userInfo.profile;
        state.token = userInfo.token;
    };
    return {
        state,
        setUserInof,
    }
});