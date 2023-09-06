import React, {useState} from "react";
import { Login } from "../../api/endpoints/auth";
import { useDispatch } from "react-redux";
import { login } from "../../store/Slice/authSlice";

import { useNavigate } from "react-router-dom";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const naviguate = useNavigate();
    const dispatch = useDispatch();


    const handleLogin = async (email, password) => {
        setLoading(true);

        try {
            const response = await Login(email, password);
            dispatch(login({ user: response.data, token: response.token }));
            naviguate("/#");
            window.location.href = "/#";
        } catch (e) {
            console.log(e);
            if(e.response === 401) {
                setError("Email ou mot de passe incorrect");
            } else {
                setError(e);
            }
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


