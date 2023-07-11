import React from "react";

import {getRequest, postRequestFormData, putRequest, deleteRequest} from "../helpers/request";



export const getMasterclasses = () => {
    return getRequest("/masterclasses");
}

export const getMasterclass = (id) => {
    return getRequest(`/masterclasses/${id}`);
}

export const getMasterclassByCompositor = (id) => {
    return getRequest(`/masterclasses/compositor/${id}`);
}

export const postMasterclass = (masterclassData) => {
    return postRequestFormData("/masterclasses", masterclassData);
}

export const updateMasterclass = (id, masterclassData) => {
    return putRequest(`/masterclasses/${id}`, masterclassData);
}

export const deleteMasterclass = (id) => {
    return deleteRequest(`/masterclasses/${id}`);
}

