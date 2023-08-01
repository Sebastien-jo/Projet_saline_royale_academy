import React from "react";

import {deleteRequest, getRequest, putRequest, postRequestFormData} from "../helpers/request";

export const getForums = () => {
    return getRequest("/forums");
}

export const getForum = (id) => {
    return getRequest(`/forums/${id}`);
}

export const addForum = (data) => {
    return postRequestFormData(`/admin/forums`, data);
}

export const deleteForum= (id) => {
    return deleteRequest(`/forums/${id}`);
}

export const updateForum = (id, data) => {
    return putRequest(`/forums/${id}`, data);
}
