import React from "react";
import {getRequest, deleteRequest, putRequest, postRequestJsonNotToken} from "../helpers/request";


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
    return putRequest(`/users/${id}`, data);
}

