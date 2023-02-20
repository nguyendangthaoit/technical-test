import api from './axiosClient.service';
import baseUrl from '../uitls/baseUrl.json';
const { isProSite, basedUrlPro, basedUrl } = baseUrl;

export const getCafes = async (location) => {
    return await api.get(`cafes?location=${location}`);
}

export const createCafe = async (obj) => {
    return await api.post(`cafe`, obj);
}

export const updateCafe = async (obj) => {
    return await api.put(`cafe`, obj);
}

export const delCafe = async (id) => {
    return await api.delete(`cafe/${id}`);
}

export const uploadImg = async (form) => {
    return await api.post(`uploadImg`, form);
}

export const getImg = (file) => {
    return `${isProSite ? basedUrlPro : basedUrl}getImg/${file}`;
}

