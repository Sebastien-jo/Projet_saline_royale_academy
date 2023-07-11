import React from "react";

import {getRequest} from "../helpers/request";


export const getOeuvres = () => {
    return getRequest("/works");
}

export const getOeuvre = (id) => {
    return getRequest(`/works/${id}`);
}

