import React from "react";

import { postRequestJsonNotToken} from "../helpers/request";

export const Login = (email, password) => {
    const credentials = {
        email,
        password
    };

    return postRequestJsonNotToken("/login", credentials);
}

export const Register = (userData) => {
    return postRequestJsonNotToken("/users", userData);
}



