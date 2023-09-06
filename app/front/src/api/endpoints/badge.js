import React from "react";

import {getRequest, putRequest, deleteRequest, postRequestFormData, postRequestJson} from "../helpers/request";


export const getBadges = () => {
    return getRequest("/badges");
}

export const getBadge = (id) => {
    return getRequest(`/badges/${id}`);
}

export const addBadge = (data) => {
    return postRequestJson("/badges", data);
}

export const addBadgeImage = (data) => {
    return postRequestFormData(`/badge_images`, data);
}

export const deleteBadgeImage = (id) => {
    return deleteRequest(`/badge_images/${id}`);
}

export const updateBadge = (id, data) => {
    return putRequest(`/badges/${id}`, data);
}

export const deleteBadge = (id) => {
    return deleteRequest(`/badges/${id}`);
}