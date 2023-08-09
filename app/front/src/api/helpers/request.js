import axios from "axios";
import { apiConfig, apiConfigNotToken } from "../config/apiConfig";

export const httpClient = axios.create({
    baseURL: apiConfig.baseUrl,
    timeout: apiConfig.timeout,
    headers: apiConfig.headers
});

export const httpClientNotToken = axios.create({
    baseURL: apiConfigNotToken.baseUrl,
    timeout: apiConfigNotToken.timeout,
    headers: apiConfigNotToken.headers
});



export const getRequest = async (url, params = {}) => {
    try{
        const response = await httpClient.get(url, { params});
        return response.data;
    }catch (error){
        throw new Error(error);
    }
};

export const postRequestJson = async (url, body) => {
    try{
        const response = await httpClient.post(url, body);
        return response.data;
    }catch (error){
        throw new Error(error);
    }
}

export const postRequestJsonNotToken = async (url, body) => {
    try{
        const response = await httpClientNotToken.post(url, body);
        return response.data;
    }catch (error){
        throw new Error(error);
    }
}

export const postRequestFormData = async (url, body) => {
    try{
        const response = await httpClient.post(url, body, { headers: { 'Content-Type': 'multipart/form-data' }});
        return response.data;
    }catch (error){
        throw new Error(error);
    }
}

export const putRequest = async (url, body) => {
    try{
        const response = await httpClient.put(url, body);
        return response.data;
    }catch (error){
        throw new Error(error);
    }
}

export const patchRequest = async (url, body) => {
    try{
        const response = await httpClient.patch(url, body);
        return response.data;
    }catch (error){
        throw new Error(error);
    }
}

export const deleteRequest = async (url) => {
    try{
        const response = await httpClient.delete(url);
        return response.data;
    }catch (error){
        throw new Error(error);
    }
}

export default {
    httpClient,
    getRequest,
    postRequestJson,
    postRequestFormData,
    postRequestJsonNotToken,
    putRequest,
    patchRequest,
    deleteRequest
};