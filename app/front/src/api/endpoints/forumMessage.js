import React from "react";

import { getRequest, postRequestFormData} from "../helpers/request";


export const getForumMessage = (id) => {
    return getRequest(`/forums/${id}/messages`);
}

export const addForumMessage = (data) => {
    return postRequestFormData(`/forum_messages`, data);
}

