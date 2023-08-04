import React from "react";

import {getRequest, postRequestJson} from "../helpers/request";


export const getForumMessage = (id) => {
    return getRequest(`/forums/${id}/messages`);
}

export const addForumMessage = (data) => {
    return postRequestJson(`/forum_messages`, data);
}

