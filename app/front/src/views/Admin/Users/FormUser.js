import React, {useEffect, useState} from 'react';
import Button from "../../../components/button/button";
import Input from "../../../components/form/input";
import Select from "../../../components/form/select";
import {useParams} from "react-router-dom";
import {getUser} from "../../../api/endpoints/user";
import useUsers from "../../../hooks/api/useUsers";
import {useNavigate} from "react-router-dom";



const FormUser = () => {

    const id = parseInt(useParams().id);
    const [user, setUser] = useState([]);
    const {loading, error, handlePost} = useUsers();


    const [open, setOpen] = useState(false);
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [plainPassword, setPlainPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [role, setRole] = useState("");
    const [instrument, setInstrument] = useState("");

    const [preview, setPreview] = useState(null);

    const listRole = ["User", "Teacher", "Admin"];
    const listInstrument = ["Violon", "Violoncelle", "Alto", "Flute", "Clarinette", "Trombone", "Haut-bois", "Piano", "Chant", "Chef d'orchestre"]

    const navigate = useNavigate();

    useEffect(() => {
        if(id !== undefined) {
            getUser(id).then((response) => {
                setUser(response);
                setLastName(response.lastName);
                setFirstName(response.firstName);
                setEmail(response.email);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        handlePost({ lastName, firstName, email, plainPassword})
        .then((response) => {
            navigate("/#/users");
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleFileSelect = (files) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            setPreview(e.target.result);
        };

        if (files.length > 0) {
            reader.readAsDataURL(files[0]);
        }
    }


    return (
        <div className="main-container">
            <div className="main-content">
                <h2>Ajouter un utilisateur</h2>
                <form onSubmit={handleSubmit} method="POST">
                    <div className={`form-first`}>
                        <div className={"form-row"}>
                            <Input name="lastname" label="Nom" type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                            <Input name="firstname" label="Prénom" type="text" value={firstName}  onChange={e => setFirstName(e.target.value)} />
                        </div>
                        <Input name="email" label="Email" type="email" value={email}  onChange={e => setEmail(e.target.value)} />
                        <Input name="plainPassword" label="Password" type="password" onChange={e => setPlainPassword(e.target.value)} />
                        <Input name="password2" label="Confimation de password" type="password" onChange={e => setPassword2(e.target.value)} />
                        <Select name="role" label="Rôle" onChange={e => setRole(e.target.value)} list={listRole} />
                        {
                            role === "User" || role === "Teacher" ?
                                <Select name="instrument" label="Instrument" onChange={e => setInstrument(e.target.value)} list={listInstrument} />
                                :
                                null
                        }
                    </div>

                    <div className={`avatar-container`}>
                        <p>Choisissez un avatar</p>
                        <input
                            name="avatar"
                            label="Avatar"
                            type="file"
                            onChange={handleFileSelect}
                        />
                        <div className="image-preview">
                            {preview && <img src={preview} alt="Preview" />}
                        </div>
                    </div>

                    <Button className={"btn red-full"}  text={"Continuer"} isArrow={true} />
                    <input type={"submit"} value={"Envoyer"} className={"btn red-full"} />

                </form>
            </div>
        </div>
    );
}

export default FormUser;