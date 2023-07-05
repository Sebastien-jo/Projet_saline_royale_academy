import React from "react";

import {getRequests, postRequestFormData, putRequest, deleteRequest} from "../helpers/request";



export const getMasterclasses = () => {
    return getRequests("/masterclasses");
}

export const getMasterclass = (id) => {
    return getRequests(`/masterclasses/${id}`);
}

export const getMasterclassByCompositor = (id) => {
    return getRequests(`/masterclasses/compositor/${id}`);
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

