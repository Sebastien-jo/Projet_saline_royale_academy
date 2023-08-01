import React from "react";

import {deleteRequest, getRequest, putRequest, postRequestFormData} from "../helpers/request";


export const getCompositors = () => {
    return getRequest("/composers");
}

export const getCompositor = (id) => {
    return getRequest(`/composers/${id}`);
}

export const addCompositor = (data) => {
    return postRequestFormData(`/composers`, data);
}
export const deleteCompositor = (id) => {
    return deleteRequest(`/composers/${id}`);
}

export const updateCompositor = (id, data) => {
    return putRequest(`/composers/${id}`, data);
}

