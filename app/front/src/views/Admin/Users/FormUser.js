import React, {useEffect, useState, useRef} from 'react';
import Button from "../../../components/button/button";
import Input from "../../../components/form/input";
import Select from "../../../components/form/select";
import {useParams} from "react-router-dom";
import {getUser} from "../../../api/endpoints/user";
import useUsers from "../../../hooks/api/useUsers";
import {useNavigate} from "react-router-dom";
import InputFile from "../../../components/form/inputFile";
import SubmitBtn from "../../../components/form/submitBtn";
import {useTranslation} from "react-i18next";



const FormUser = () => {

    const id = parseInt(useParams().id);
    const [user, setUser] = useState([]);
    const {loading, error, handlePost, handleAddUserImage} = useUsers();


    const [open, setOpen] = useState(false);
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [plainPassword, setPlainPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [role, setRole] = useState("");
    const [instrument, setInstrument] = useState("");

    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null); // Ref to the file input element
    const [file, setFile] = useState(); // State to store the selected file

    const listRole = ["User", "Teacher", "Admin"];
    const listInstrument = ["Violon", "Violoncelle", "Alto", "Flute", "Clarinette", "Trombone", "Haut-bois", "Piano", "Chant", "Chef d'orchestre"]

    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

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

            const formData = new FormData();
            formData.append("file", file); // Append the selected file to the FormData

            handleAddUserImage(formData).then((response) => {
                console.log(response);
            }).then((error) => {
                navigate("/users");
            }).catch((error) => {
                console.log(error);
            });

        }).catch((error) => {
            console.log(error);
        });
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Access the file object and update the state
    }


    return (
        <div className="main-container">
            <div className="main-content">
                <h2>{ t('admin.user.title') }</h2>
                <form onSubmit={handleSubmit} method="POST">
                    <div className={`form-first`}>
                        <div className={"form-row"}>
                            <Input name="lastname" label={ t('admin.user.form.lastname') } type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                            <Input name="firstname" label={ t('admin.user.form.firstname') } type="text" value={firstName}  onChange={e => setFirstName(e.target.value)} />
                        </div>
                        <Input name="email" label={ t('admin.user.form.email') } type="email" value={email}  onChange={e => setEmail(e.target.value)} />
                        <Input name="plainPassword" label={ t('admin.user.form.password') } type="password" onChange={e => setPlainPassword(e.target.value)} />
                        <Input name="password2" label={ t('admin.user.form.confirm_password') } type="password" onChange={e => setPassword2(e.target.value)} />
                        <Select name="role" label={ t('admin.user.form.role') } onChange={e => setRole(e.target.value)} list={listRole} />
                        {
                            role === "User" || role === "Teacher" ?
                                <Select name="instrument" label="Instrument" onChange={e => setInstrument(e.target.value)} list={listInstrument} />
                                :
                                null
                        }
                    </div>

                    <div className={`avatar-container`}>
                        <InputFile reference={fileInputRef} name="file" label={ t('admin.user.form.image') } onChange={handleFileChange} />
                    </div>

                    <SubmitBtn text={ t('bouton.add') } className={"red-full"}/>

                </form>
            </div>
        </div>
    );
}

export default FormUser;