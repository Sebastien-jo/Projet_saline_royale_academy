import React from "react";

import {getRequest} from "../helpers/request";


export const getCompositors = () => {
    return getRequest("/composers");
}

export const getCompositor = (id) => {
    return getRequest(`/composers/${id}`);
}

