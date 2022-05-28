interface RequestRes<
    T extends string | object | ArrayBuffer
> extends NetworkRequestRes {
    data: T;
}

type Success = <
    T extends string | object | ArrayBuffer
>(res: RequestRes<T>)=> RequestRes<T>;

type Fail = (err: any) => any;
type Request = <
    T extends string | object | ArrayBuffer
>(options: NetworkRequestOpts) => Promise<RequestRes<T>>

export function request<
    T extends string | object | ArrayBuffer
>(baseUrl: string, options: NetworkRequestOpts) {
    options.url = baseUrl + options.url;
    let {
        success: successFn,
        fail: failFn
    } = options;
    let success: Success = (res) => {
        successFn && successFn(res);
        return res;
    };
    let fail: Fail = (err) => {
        failFn && failFn(err);
        return err;
    };
    return new Promise<RequestRes<T>>((resolve, reject) => {
        options.fail = (err) => {
            reject(err);
        };
        options.success = (res) => {
            resolve(res as any);
        }
        wx.request(options)
    }).then(success).catch(fail);
}

export let wxRequest: Request = request.bind(null, "http://127.0.0.1:3000");