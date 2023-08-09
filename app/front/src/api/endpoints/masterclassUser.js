import React from "react";

import {getRequest, patchRequest, postRequestFormData, deleteRequest} from "../helpers/request";


export const getMasterclassUsers = () => {
    return getRequest("/masterclass_users/");
}

export const getMasterclassUser = (id) => {
    return getRequest(`/masterclass_users/${id}`);
}

export const addMasterclassUser = (id, data) => {
    return postRequestFormData(`/masterclass_users/add_masterclass/${id}`, data);
}

export const deleteMasterclassUser = (id) => {
    return deleteRequest(`/masterclass_users/delete_masterclass/${id}`);
}

export const updateMasterclassUser = (id, data) => {
    return patchRequest(`/masterclass_users/${id}`, data);
}