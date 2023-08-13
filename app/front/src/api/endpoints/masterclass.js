import React from "react";

import {getRequest, postRequestJson, putRequest, deleteRequest} from "../helpers/request";

export const getMasterclasses = () => {
    return getRequest("/masterclasses");
}

export const getMasterclass = (id) => {
    return getRequest(`/masterclasses/${id}`);
}

export const getMasterclassByCompositor = (id) => {
    return getRequest(`/masterclasses/compositor/${id}`);
}

export const addMasterclass = (masterclassData) => {
    return postRequestJson("/masterclasses", masterclassData);
}

export const updateMasterclass = (id, masterclassData) => {
    return putRequest(`/masterclasses/${id}`, masterclassData);
}

export const deleteMasterclass = (id) => {
    return deleteRequest(`/masterclasses/${id}`);
}

