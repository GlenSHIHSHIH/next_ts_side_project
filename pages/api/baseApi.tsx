import axios, { AxiosRequestConfig } from 'axios';

const TIMEOUT = 5000;
const devBaseURL = "http://localhost";
const proBaseURL = "http://localhost";
console.log("env: "+process.env.NODE_ENV);
const baseURL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;


const instance = axios.create({
    timeout: TIMEOUT,
    baseURL: baseURL,
    headers: { 'Content-Type': 'application/json' },
    responseType: 'json',

})

instance.interceptors.request.use(config => {
    // 1.傳送網路請求時，在頁面中新增一個loading元件作為動畫；

    // 2.某些網路請求要求使用者必須登入，可以在請求中判斷是否攜帶了token，沒有攜帶token直接跳轉到login頁面；

    // 3.對某些請求引數進行序列化；
    return config;
}, err => {
    return err;
})

instance.interceptors.response.use(response => {
    return response.data;
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = "請求錯誤";
                break;
            case 401:
                err.message = "未授權訪問";
                break;
            case 404:
                console.log("你要找的頁面不存在")
                // go to 404 page
                break
            case 500:
                console.log("程式發生問題")
                // go to 500 page
                break
            default:
                console.log(err.message)
        }
    }
    return err;
})

// 此處的instance為我們create的實體
export default function (method: string, url: string, data = null, config: AxiosRequestConfig<null> | any) {
    method = method.toLowerCase();
    switch (method) {
        case "post":
            return instance.post(url, data, config);
        case "get":
            return instance.get(url, { params: data });
        case "delete":
            return instance.delete(url, { params: data });
        case "put":
            return instance.put(url, data, config);
        case "patch":
            return instance.patch(url, data, config);
        // default:
        //     console.log(`未知的 method: ${method}`);
        //     return false;
    }
}