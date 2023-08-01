import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {Register} from "../api/endpoints/auth";

const useRegister = () => {

        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        const naviguate = useNavigate();

        const handleRegister = async (userData) => {
            try {
                const response = await Register(userData);
                naviguate("/");
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        }

        return {
            handleRegister,
            loading,
            error,
        }
}

export default useRegister;