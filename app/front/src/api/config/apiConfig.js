import {httpClient} from "../helpers/request";

export const apiConfig = {
    baseUrl:'http://back.groupe7.hetic-projects.arcplex.tech/api',
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

