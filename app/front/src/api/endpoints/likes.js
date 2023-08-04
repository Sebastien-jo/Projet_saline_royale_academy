import React from 'react';

import {deleteRequest, getRequest, putRequest, postRequestJson} from "../helpers/request";

export const getLikes = () => {
    return getRequest("/likes");
}

export const getLike = (id) => {
    return getRequest(`/likes/${id}`);
}

export const addLike = (data) => {
    return postRequestJson(`/likes`, data);
}

export const deleteLike= (id) => {
    return deleteRequest(`/likes/${id}`);
}

export const updateLike = (id, data) => {
    return putRequest(`/likes/${id}`, data);
}