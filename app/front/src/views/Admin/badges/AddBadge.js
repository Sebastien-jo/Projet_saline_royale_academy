import React,{useState} from 'react';
import Button from "../../../components/button/button";
import Input from "../../../components/form/input";
import Textarea from "../../../components/form/textarea";



const AddBadge = () => {


    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

        /*handleRegister({ lastName, firstName, email, plainPassword, role, instrument });*/
    }

    return (
        <div className="main-container">
            <div className="main-content">
                <h2>Ajouter un badge</h2>
                <form onSubmit={handleSubmit} method="POST">
                    <div className={`form-first`}>
                        <Input name="name" label="Nom" type="text" onChange={e => setName(e.target.value)} />
                        <Textarea name="description" label="Description" type="text" onChange={e => setDescription(e.target.value)} />
                        <Input name="image" label="Image" type="file" onChange={e => setImage(e.target.value)} />
                    </div>


                    <Button className={"btn red-full"}  text={"Continuer"} isArrow={true} />


                </form>
            </div>
        </div>
    );
}

export default AddBadge;