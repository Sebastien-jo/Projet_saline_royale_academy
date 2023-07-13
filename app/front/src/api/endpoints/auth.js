import React from "react";

import {postRequestFormData, postRequestJson, postRequestJsonNotToken} from "../helpers/request";

export const Login = (email, password) => {
    const credentials = {
        email,
        password
    };

    return postRequestJson("/login", credentials);
}

export const Register = (userData) => {
    return postRequestJsonNotToken("/users", userData);
}



