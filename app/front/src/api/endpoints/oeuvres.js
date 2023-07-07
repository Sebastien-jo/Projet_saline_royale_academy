import React from "react";

import {getRequests} from "../helpers/request";


export const getOeuvres = () => {
    return getRequests("/works");
}

export const getOeuvre = (id) => {
    return getRequests(`/works/${id}`);
}

