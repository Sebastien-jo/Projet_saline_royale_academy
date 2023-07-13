import React, {useEffect, useState} from "react";
import Input from "../../components/form/input";
import logo from "../../assets/logo/logo-login.svg";
import "../../styles/components/form.css";
import useLogin from "../../hooks/useLogin";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {loading, error, handleLogin} = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();

        handleLogin( email, password );

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
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    {error && <p className="error">{error.message}</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;