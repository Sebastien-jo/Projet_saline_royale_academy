import React from "react";

import {postRequestFormData, postRequestJson} from "../helpers/request";

export const Login = (email, password) => {
    const credentials = {
        email,
        password
    };

    return postRequestJson("/login", credentials);
}

export const Register = (userData) => {
    console.log(userData);
    return postRequestFormData("/users", userData);
}



