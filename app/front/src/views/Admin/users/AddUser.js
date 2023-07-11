import React,{useState} from 'react';
import Button from "../../../components/button/button";
import Input from "../../../components/form/input";
import Select from "../../../components/form/select";


const AddUser = () => {


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

    const handleSubmit = (e) => {
        e.preventDefault();

        /*handleRegister({ lastName, firstName, email, plainPassword, role, instrument });*/
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
                            <Input name="lastname" label="Nom" type="text" onChange={e => setLastName(e.target.value)} />
                            <Input name="firstname" label="Prénom" type="text" onChange={e => setFirstName(e.target.value)} />
                        </div>
                        <Input name="email" label="Email" type="email" onChange={e => setEmail(e.target.value)} />
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


                </form>
            </div>
        </div>
    );
}

export default AddUser;