import React from "react";

import {getRequest} from "../helpers/request";


export const getCategories = () => {
    return getRequest("/categories");
}

export const getCategory = (id) => {
    return getRequest(`/categories/${id}`);
}

