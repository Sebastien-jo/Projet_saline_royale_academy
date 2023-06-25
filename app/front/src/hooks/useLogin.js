import React, {useState} from "react";
import { Login } from "../api/endpoints/auth";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (email, password) => {
        setLoading(true);

        try {
            const response = await Login(email, password);
            console.log(response);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        error,
        handleLogin,
    };
}

export default useLogin;


