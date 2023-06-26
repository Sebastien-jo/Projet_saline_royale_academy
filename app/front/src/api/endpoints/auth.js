import React from "react";

import {postRequest} from "../helpers/request";

export const Login = (email, password) => {
    const credentials = {
        email,
        password
    };

    return postRequest("/login", credentials);
}

export const Register = (userData) => {
    return postRequest("/register", userData);
}



