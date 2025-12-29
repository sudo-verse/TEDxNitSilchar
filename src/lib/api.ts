import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_BASE_URL } from './constants';

const createApiInstance = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: API_BASE_URL,
        timeout: 2 * 60 * 1000, // 2 minutes for AI operations
        headers: {
            'Content-Type': 'application/json'
        }
    });

    instance.interceptors.response.use(
        (response: AxiosResponse) => response,
        async error => {
            console.error(error);
            return Promise.reject(error);
        }
    );

    return instance;
};

export const api = createApiInstance();
