import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getCompositor} from "../../../api/endpoints/compositor";
import Input from "../../../components/form/input";
import Textarea from "../../../components/form/textarea";
import Button from "../../../components/button/button";
import Select from "../../../components/form/select";
import {getOeuvre} from "../../../api/endpoints/oeuvres";

const FormOeuvre = ({title}) => {


    const id = useParams().id;
    const [oeuvre, setOeuvre] = useState([]);

    const [name, setName] = useState(id ? oeuvre.name : "");
    const [partitionImage, setPartitionImage] = useState(id ? oeuvre.partitionImage : "");
    const [composer, setComposer] = useState(id ? oeuvre.composer : "");
    const [instrument, setInstrument] = useState(id ? oeuvre.instrument : "");
    const [description, setDescription] = useState(id ? oeuvre.description : "");
    const [audioPartition, setAudioPartition] = useState(id ? oeuvre.audioPartition : "");
    const [pdf, setPDF] = useState(id ? oeuvre.pdf : "");



    useEffect(() => {
        if(id !== undefined){
            getOeuvre(id).then(response => {
                setOeuvre(response);
            }).catch(error => {
                console.log(error);
            });
        }
    }, []);


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
                        {/* Name => text, PartitionImage => file, Composer => select, Instrument => select, Description => textarea, AudioPartition => file, PDF => file */}

                        <Input type="text" name="name" label="Nom de l'oeuvre" onChange={e => setName(e.target.value)} value={name}/>
                        <Input type="file" name="PartitionImage" label="Image de la partition" onChange={e => setPartitionImage(e.target.value)} value={partitionImage}/>
                        <Select name="Composer" label="Compositeur" list={[]} onChange={e => setComposer(e.target.value)} value={composer}/>
                        <Select name="Instrument" label="Instrument" list={[]} onChange={e => setInstrument(e.target.value)} value={instrument}/>
                        <Textarea name="Description" label="Description" onChange={e => setDescription(e.target.value)} value={description}/>
                        <Input type="file" name="AudioPartition" label="Audio de la partition" onChange={e => setAudioPartition(e.target.value)} value={audioPartition}/>
                        <Input type="file" name="PDF" label="PDF" onChange={e => setPDF(e.target.value)} value={pdf}/>

                        <Button text="Ajouter" className={"red-full"} type="submit" isArrow={true} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormOeuvre;
