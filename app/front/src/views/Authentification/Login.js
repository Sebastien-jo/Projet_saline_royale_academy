import React, {useEffect, useState} from "react";
import Input from "../../components/form/input";
import logo from "../../assets/logo/logo-login.svg";
import "../../styles/components/form.css";
import useLogin from "../../hooks/api/useLogin";
import SubmitBtn from "../../components/form/submitBtn";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {loading, error, handleLogin} = useLogin();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin( email, password ).then( () => {
            console.log("Login success");
            navigate("/");
        });

    }

    return (
        <div className="second-container">
            <div className="logo-container">
                <img src={logo} alt="Logo" />
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit} method="POST">
                    <Input name="email" label="Email" type="email" onChange={e => setEmail(e.target.value)} />
                    <Input name="password" label="Password" type="password" onChange={e => setPassword(e.target.value)} />
                    <p>Vous n'avez pas encore de compte ? <a href={"#/signin"}>S’enregistrer</a></p>

                    <SubmitBtn text={ loading ? 'Logging in...' : 'Login'} className={"blue-full"}/>

                    {error && <p className="error">{error.message}</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;