import React from "react";

import {getRequest, putRequest, deleteRequest, postRequestJson} from "../helpers/request";


export const getFavoris = () => {
    return getRequest("/favorites");
}

export const getFavorisComposer = () => {
    return getRequest("/favorites?type=composer");
}

export const addFavorisComposer = (data) => {
    return postRequestJson("favorites_composers", data);
}

export const deleteFavorisComposer = (id) => {
    return deleteRequest(`/favorites_composers/${id}`);
}


export const getFavorisOeuvre = () => {
    return getRequest("/favorites?type=work");
}

export const addFavorisOeuvre = (data) => {
    return postRequestJson("favorites_works", data);
}

export const deleteFavorisOeuvre = (id) => {
    return deleteRequest(`/favorites_works/${id}`);
}

export const getFavorisMasterclass = () => {
    return getRequest("/favorites?type=masterclass");
}

export const addFavorisMasterclass = (data) => {
    return postRequestJson("favorites_masterclasses", data);
}

export const deleteFavorisMasterclass = (id) => {
    return deleteRequest(`/favorites_masterclasses/${id}`);
}




