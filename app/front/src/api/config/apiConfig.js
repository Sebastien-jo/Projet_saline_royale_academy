import {httpClient} from "../helpers/request";

export const apiConfig = {
    baseUrl: 'http://localhost:1234/api',
    timeout: 50000000,
    headers: {
        'Content-Type': 'application/json'
    }
};

export const setAuthorizationHeader = (token) => {
   httpClient.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export const clearAuthorizationHeader = () => {
    delete apiConfig.headers['Authorization'];
};

