import api from './axiosClient.service';

export const getEmployees = async (cafe) => {
    return await api.get(`employees?cafe=${cafe}`);
}

export const createEmployee = async (obj) => {
    return await api.post(`employee`, obj);
}

export const updateEmployee = async (obj) => {
    return await api.put(`employee`, obj);
}

export const delEmployee = async (id) => {
    return await api.delete(`employee/${id}`);
}

