import React from "react";

import {getRequest, postRequest, putRequest, deleteRequest, postRequestFormData} from "../helpers/request";


export const getOeuvres = () => {
    return getRequest("/works");
}

export const getOeuvre = (id) => {
    return getRequest(`/works/${id}`);
}

export const addOeuvre = (data) => {
    return postRequestFormData("/works", data);
}

export const deleteOeuvre = (id) => {
    return deleteRequest(`/works/${id}`);
}

export const updateOeuvre = (id, data) => {
    return putRequest(`/works/${id}`, data);
}



