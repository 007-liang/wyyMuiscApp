import { wxRequest } from "@/utils";
import { userInfo as data } from '@/store';

type IUserLevel = { data: IUserlv };
type TUserInfo = {
    data: CloudMusicRes & IUserInfo;
};
type TIdList = {
    checkPoint: number;
    ids: number[];
};
type TCode = CloudMusicRes & { 
    data: boolean, 
    message: string  
};

export const getLikeList = (uid: number) => {
    return wxRequest<CloudMusicRes & TIdList>({
        url: '/likelist',
        data: {
            uid,
            cookie: data.cookie,
        },
    });
};

export const getUserLevel = () => {
    return wxRequest<IUserLevel & CloudMusicRes>({
		url: '/user/level',
		data: { 
            cookie: data.cookie 
        },
	});
};

export const getLoginStatus = (cookie: string) => {
    return  wxRequest<TUserInfo>({
        url: '/login/status',
        data: { 
            cookie: cookie || data.cookie 
        },
    });
};

export const sendLogin = (
    phone: string, 
    md5_password: string
) => {
    return wxRequest<
        Required<ILoginStatus>
    >({ 
        url: "/login/cellphone",
        data: {
            phone,
            md5_password,
        } 
    });
};

export const sendCaptcha = (phone: string) => {
    return wxRequest<TCode>({
		url: '/captcha/sent',
		data: { phone },
	});
};

export const getValidateCode = (phone: string, captcha: string) => {
    return wxRequest<TCode>({
        url: '/captcha/verify',
        data: {
            phone,
            captcha,
        }
    });
};