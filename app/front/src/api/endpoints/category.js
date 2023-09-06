import React from "react";

import {getRequest, getRequestNoToken} from "../helpers/request";


export const getCategories = () => {
    return getRequest("/categories");
}

export const getCategory = (id) => {
    return getRequest(`/categories/${id}`);
}

export const getCategoriesNoToken = () => {
    return getRequestNoToken("/categories");
}

