import React from "react";
import {httpClient} from "../helpers/request";

export const Login = (email, password) => {
    const credentials = {
        email,
        password
    }

    console.log();
    return httpClient.postRequest("/login", credentials);
}

export const Register = (userData) => {
    return httpClient.postRequest("/register", userData);
}



