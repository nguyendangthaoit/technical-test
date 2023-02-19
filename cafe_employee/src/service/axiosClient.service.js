import axios from 'axios';
import baseUrl from '../uitls/baseUrl.json';
const { isProSite, basedUrlPro, basedUrl } = baseUrl;
// import storage from "./storage";
// Create axios client, pre-configured with baseURL
let HTTP = axios.create({
    baseURL: isProSite ? basedUrlPro : basedUrl,
    timeout: 120000,
    validateStatus: (status) => {
        // ignore api exception status
        return true;
    }
});

HTTP.interceptors.request.use(async (config) => {
    return config;
}, error => {
    return Promise.reject(error);
});

HTTP.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    throw error;
});
export default HTTP;