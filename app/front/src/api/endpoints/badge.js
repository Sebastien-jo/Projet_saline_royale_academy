import React from "react";

import {getRequests} from "../helpers/request";


export const getBadges = () => {
    return getRequests("/badges");
}

export const getBadge = (id) => {
    return getRequests(`/badges/${id}`);
}