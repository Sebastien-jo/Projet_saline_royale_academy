import React from "react";

import {getRequests} from "../helpers/request";


export const getCompositors = () => {
    return getRequests("/compositors");
}

export const getCompositor = (id) => {
    return getRequests(`/compositors/${id}`);
}

