import React, {useEffect, useState} from "react";
import Input from "../../components/form/input";
import logo from "../../assets/logo/logo-login.svg";
import "../../styles/components/form.css";
import useRegister from "../../hooks/useRegister";
import cello from "../../assets/icones/icon-cello.svg";
import violin from "../../assets/icones/icon-violin.svg";
import piano from "../../assets/icones/icon-piano.svg";
import voice from "../../assets/icones/icon-voice.svg";
import viola from "../../assets/icones/icon-viola.svg";
import flute from "../../assets/icones/icon-flute.svg";
import clarinet from "../../assets/icones/icon-clarinet.svg";
import trombone from "../../assets/icones/icon-trombone.svg";
import oboe from "../../assets/icones/icon-oboe.svg";
import Button from "../../components/button/button";


const SignIn = () => {

    const [valid, setValid] = useState(false);
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [plainPassword, setPlainPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [open, setOpen] = useState(false);

    const instruments = [
        {name: "violon", icon: violin},
        {name: "violoncelle", icon: cello},
        {name: "alto", icon: viola},
        {name: "flute", icon: flute},
        {name: "clarinette", icon: clarinet},
        {name: "trombone", icon: trombone},
        {name: "Haut-bois", icon: oboe},
        {name: "piano", icon: piano},
        {name: "chant", icon: voice},
        {name: "chef d'orchestre", icon: ""}
    ];

    const {loading, error, handleRegister} = useRegister();

    const handleSubmit = (e) => {
        e.preventDefault();

        handleRegister({ lastName, firstName, email, plainPassword });
    }

    const handleOpen = () => {
        console.log(valid);
        if (valid == true) {
            setOpen(true);
        }
    }

    useEffect(() => {
        //check if all fields are filled
        if (lastName && firstName && email && plainPassword && password2) {
            if (plainPassword !== password2) {
                setValid("Les mots de passe ne sont pas identiques");
            }else{
                setValid(true);
            }
        }   else{
            setValid("Veuillez remplir tous les champs");
        }


    }, [ lastName, firstName, email, plainPassword, password2]);

    return (
        <div className="second-container">
            <div className="logo-container">
                <img src={logo} alt="Logo" />
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit} method="POST">
                    <div className={`form-first ${open ? "closed" : ""}`}>
                        <div className={"form-row"}>
                            <Input name="lastname" label="Nom" type="text" onChange={e => setLastName(e.target.value)} />
                            <Input name="firstname" label="Prénom" type="text" onChange={e => setFirstName(e.target.value)} />
                        </div>
                        <Input name="email" label="Email" type="email" onChange={e => setEmail(e.target.value)} />
                        <Input name="plainPassword" label="Password" type="password" onChange={e => setPlainPassword(e.target.value)} />
                        <Input name="password2" label="Confimation de password" type="password" onChange={e => setPassword2(e.target.value)} />

                        <p>Vous avez déjà un compte ? <a href={"#/login"}>Se connecter</a></p>
                        <Button className={"btn red-full"} click={handleOpen} text={"Continuer"} isArrow={true} />
                        {valid && <p className="error">{valid}</p>}
                    </div>

                    <div className={`instruments-container ${open ? "open" : ""}`}>
                        <p>Bienvenue {firstName}, de quel instrument joué vous ?</p>
                        <div className="instruments">
                            {
                                instruments.map((instrument, index) => (
                                    <div className={"instrument-item check"}>
                                        <img src={instrument.icon} alt={instrument.name}/>
                                        <input type={"radio"} name={"instrument"} key={index} value={instrument.name}/>
                                    </div>
                                ))
                            }
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {loading ? 'Sign In in...' : 'Sign In'}
                        </button>

                        {error && <p className="error">{error.message}</p>}
                    </div>


                </form>
            </div>


        </div>
    );
}

export default SignIn;
