import axios from 'axios'
import { BACKEND_URL } from '../constants/url.constants';

const axiosApiInstance = axios.create()


axiosApiInstance.interceptors.request.use(
    (config) => {
        if(config.url?.includes('mediavalet')) {
            const token = localStorage.getItem('MEDIAVALET_ACCESS_TOKEN');
            config.headers['Authorization'] = 'Bearer ' + token;
            config.headers['Ocp-Apim-Subscription-Key'] = process.env.REACT_APP_MEDIAVALET_SUBSCRIPTION_KEY
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

axiosApiInstance.interceptors.response.use((response) => {
    return response
    }, async function (error) {
    const originalRequest = error.config;
    console.log(error);
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const access_token = await refreshAccessToken();            
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        console.log('requesting')
        return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
    });

async function refreshAccessToken() {
    return new Promise(async(resolve, reject) => {
        const token = localStorage.getItem('MEDIAVALET_REFRESH_TOKEN')
        const refresh = await axios.post(`${BACKEND_URL}mvRefresh?refreshToken=${token}`)
        localStorage.setItem('MEDIAVALET_ACCESS_TOKEN', refresh.data?.access_token)
        localStorage.setItem('MEDIAVALET_REFRESH_TOKEN', refresh.data?.refresh_token)
        resolve();
    })
}



export default axiosApiInstance;
