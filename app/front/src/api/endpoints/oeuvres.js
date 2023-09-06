import React from "react";

import {getRequest, deleteRequest, postRequestFormData, patchRequest} from "../helpers/request";


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
    return patchRequest(`/works/${id}`, data);
}



