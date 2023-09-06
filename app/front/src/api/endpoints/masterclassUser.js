import React from "react";

import {getRequest, patchRequest, postRequestFormData, deleteRequest, postRequestJson} from "../helpers/request";


export const getMasterclassUsers = () => {
    return getRequest("/masterclass_users/");
}

export const getMasterclassUser = (id) => {
    return getRequest(`/masterclass_users/${id}`);
}

export const addMasterclassUser = (id) => {
    return postRequestJson(`/masterclass_users/add_masterclass/${id}`, {});
}

export const deleteMasterclassUser = (id) => {
    return deleteRequest(`/masterclass_users/delete_masterclass/${id}`);
}

export const updateMasterclassUser = (id, data) => {
    return patchRequest(`/masterclass_users/${id}`, data);
}

export const validateMasterclassUser = (id) => {
    return patchRequest(`/lesson_users/${id}/validate`);
}