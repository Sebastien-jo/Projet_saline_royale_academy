import React from "react";
import Input from "../../components/form/input";
import logo from "../../assets/logo/logo-login.svg";
import "../../styles/components/form.css";

const SignIn = () => {

    return (
        <div className="second-container">
            <div className="logo-container">
                <img src={logo} alt="Logo" />
            </div>
            <div className="form-container">
                <form action="/Users/maelyschassin/Desktop/Projet_saline_royale_academy/app/front/src/views/Authentification/SignIn.js" method="POST">
                    <div className={"form-row"}>
                        <Input name="nom" label="Nom" type="text" />
                        <Input name="prenom" label="Prénom" type="text" />
                    </div>
                    <Input name="email" label="Email" type="email" />
                    <Input name="password" label="Password" type="password" />
                    <Input name="password2" label="Confimation de password" type="password" />
                    <p>Vous avez déjà un compte ? <a href={"/login"}>Se connecter</a></p>
                    <button type="submit" className="btn btn-primary">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
