import React from "react";

import {getRequests} from "../helpers/request";


export const getCompositors = () => {
    return getRequests("/composers");
}

export const getCompositor = (id) => {
    return getRequests(`/composers/${id}`);
}

