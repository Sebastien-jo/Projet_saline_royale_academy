import React from "react";

import {getRequest, postRequest, putRequest, deleteRequest, postRequestFormData} from "../helpers/request";


export const getBadges = () => {
    return getRequest("/badges");
}

export const getBadge = (id) => {
    return getRequest(`/badges/${id}`);
}

export const addBadge = (data) => {
    return postRequestFormData("/badges", data);
}

export const updateBadge = (id, data) => {
    return putRequest(`/badges/${id}`, data);
}

export const deleteBadge = (id) => {
    return deleteRequest(`/badges/${id}`);
}