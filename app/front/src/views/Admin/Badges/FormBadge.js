import React, {useEffect, useState} from 'react';
import Button from "../../../components/button/button";
import Input from "../../../components/form/input";
import Textarea from "../../../components/form/textarea";
import {getBadge} from "../../../api/endpoints/badge";
import {useParams} from "react-router-dom";

const FormBadge = ({title}) => {

    const id = parseInt(useParams().id);
    const [badge, setBadge] = useState([]);

    const [open, setOpen] = useState(false);
    const [name, setName] = useState(id ? badge.name : "");
    const [description, setDescription] = useState(id ? badge.description : "");
    const [image, setImage] = useState(id ? badge.image : "");

    useEffect(() => {
        if(isNaN(id) === false){
            getBadge(id).then((response) => {
                setBadge(response);
                setImage(response.imagePath);
                setName(response.name);
                setDescription(response.description);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, []);




    const handleSubmit = (e) => {
        e.preventDefault();

        /*handleRegister({ lastName, firstName, email, plainPassword, role, instrument });*/
    }

    return (
        <div className="main-container">
            <div className="main-content">
                <h2>{ title }</h2>
                <form onSubmit={handleSubmit} method="POST">
                    <div className={`form-first`}>
                        <Input name="name" label="Nom" type="text" value={name} onChange={e => setName(e.target.value)} />
                        <Textarea name="description" label="Description" value={description} type="text" onChange={e => setDescription(e.target.value)} />
                        <Input name="image" label="Image" type="file" onChange={e => setImage(e.target.value)} />
                    </div>

                    <Button className={"btn red-full"}  text={"Continuer"} isArrow={true} />
                </form>
            </div>
        </div>
    );
}

export default FormBadge;