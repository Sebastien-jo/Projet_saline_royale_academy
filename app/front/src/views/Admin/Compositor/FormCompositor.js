import React, {useEffect, useState} from "react";
import Input from "../../../components/form/input";
import Button from "../../../components/button/button";
import Textarea from "../../../components/form/textarea";
import {useParams} from "react-router-dom";
import {getCompositor} from "../../../api/endpoints/compositor";


const FormCompositor = ({title}) => {


        const id = useParams().id;
        const [compositor, setCompositor] = useState([]);
        useEffect(() => {
            if(id !== undefined){
                getCompositor(id).then((response) => {
                    console.log("hello");
                    setCompositor(response['hydra:member']);
                }).catch((error) => {
                    console.log(error);
                });
            }



        }, [id]);


        const [name, setName] = useState("");
        const [dateOfBirth, setDateOfBirth] = useState("");
        const [dateOfDeath, setDateOfDeath] = useState("");
        const [instruments, setInstruments] = useState("");
        const [description, setDescription] = useState("");
        const [picture, setPicture] = useState("");
        const [nationality, setNationality] = useState("");

        const handleSubmit = (event) => {
            event.preventDefault();
            console.log(event.target);
        }

        return (
            <div className="main-container">
                <div className="main-content">
                    <h2>{ title }</h2>
                    <form onSubmit={handleSubmit} method="POST">
                        <div className={`form-first`}>
                            <Input type="text" name="name" label="Nom du compositeur" onChange={e => setName(e.target.value)} value={name}/>
                            <Input type="date" name="DateOfBirth" label="Date de naissance" onChange={e => setDateOfBirth(e.target.value)} value={dateOfBirth}/>
                            <Input type="date" name="DateOfDeath" label="Date de décès" onChange={e => setDateOfDeath(e.target.value)} value={dateOfDeath}/>
                            <Input type="text" name="Instruments" label="Instruments" onChange={e => setInstruments(e.target.value)} value={instruments}/>
                            <Textarea name="Description" label="Description" onChange={e => setDescription(e.target.value)} value={description}/>
                            <Input type="file" name="Picture" label="Photo" onChange={e => setPicture(e.target.value)} value={picture}/>
                            <Input type="text" name="Nationality" label="Nationalité" onChange={e => setNationality(e.target.value)} value={nationality}/>

                            <Button text="Ajouter" className={"red-full"} type="submit" isArrow={true} />
                        </div>
                    </form>
                </div>
            </div>
        );
}

export default FormCompositor;