import React from "react";
import {getRequest, deleteRequest, patchRequest, postRequestJsonNotToken, postRequestFormData} from "../helpers/request";


export const getUsers = () => {
    return getRequest("/users");
}

export const getUser = (id) => {
    return getRequest(`/users/${id}`);
}

export const deleteUser = (id) => {
    return deleteRequest(`/users/${id}`);
}

export const addUser = (data) => {
    return postRequestJsonNotToken("/users", data);
}

export const updateUser = (id, data) => {
    return patchRequest(`/users/${id}`, data);
}

export const addUserImage = (data) => {
    return postRequestFormData(`/user_avatars`, data);
}

export const deleteUserImage = (id) => {
    return deleteRequest(`/user_avatars/${id}`);
}

