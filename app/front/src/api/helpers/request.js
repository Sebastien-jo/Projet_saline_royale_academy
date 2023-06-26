import axios from "axios";
import apiConfig from "../config/apiConfig";

export const httpClient = axios.create({
    baseURL: apiConfig.baseUrl,
    timeout: apiConfig.timeout,
    headers: apiConfig.headers
});

export const getRequests = async (url, params = {}) => {
    try{
        const response = await httpClient.get(url, { params});
        return response.data;
    }catch (error){
        throw new Error(error);
    }
};

export const postRequest = async (url, body) => {
    try{
        console.log(url);
        const response = await httpClient.post(url, body);
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

export const deleteRequest = async (url) => {
    try{
        const response = await httpClient.delete(url);
        return response.data;
    }catch (error){
        throw new Error(error);
    }
}

export default { httpClient, getRequests, postRequest, putRequest, deleteRequest };