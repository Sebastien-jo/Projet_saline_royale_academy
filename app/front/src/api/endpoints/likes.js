import React from 'react';

import {deleteRequest, getRequest, putRequest, postRequestJson, postRequestFormData} from "../helpers/request";

export const getLikes = () => {
    return getRequest("/likes");
}

export const getLike = (id) => {
    return getRequest(`/likes/${id}`);
}

export const addLike = (id, data) => {
    return postRequestJson(`/forums/${id}/likes`, data);
}

export const deleteLike= (id) => {
    return deleteRequest(`/forums/${id}/likes`);
}

export const updateLike = (id, data) => {
    return putRequest(`/likes/${id}`, data);
}