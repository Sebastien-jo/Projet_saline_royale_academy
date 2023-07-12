import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Input from "../../../components/form/input";
import Select from "../../../components/form/select";
import Textarea from "../../../components/form/textarea";
import Button from "../../../components/button/button";
import {getMasterclass} from "../../../api/endpoints/masterclass";

const FormMasterclass = ({text}) => {

    const id = useParams().id;
    const [masterclass, setMasterclass] = useState([]);

    const [title, setTitle] = useState(id ? masterclass.title : "");
    const [composer, setComposer] = useState(id ? masterclass.composer : "");
    const [teacher, setTeacher] = useState(id ? masterclass.teacher : "");
    const [lessonVideo, setLessonVideo] = useState(id ? masterclass.lessonVideo : "");


    useEffect(() => {
        if(id !== undefined){
            getMasterclass(id).then(response => {
                setMasterclass(response);
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target);
    }

    return (
        <div className="main-container">
            <div className="main-content">
                <h2>{ text }</h2>
                <form onSubmit={handleSubmit} method="POST">
                    <div className={`form-first`}>
                        {/* Tilte => text, Composer => select, Teacher => select, lessonVideo => file */}

                        <Input type="text" name="title" label="Titre de la masterclass" onChange={e => setTitle(e.target.value)} value={title}/>
                        <Select name="Composer" label="Compositeur" list={[]} onChange={e => setComposer(e.target.value)} value={composer}/>
                        <Select name="Teacher" label="Professeur" list={[]} onChange={e => setTeacher(e.target.value)} value={teacher}/>
                        <Input type="file" name="lessonVideo" label="Vidéo de la masterclass" onChange={e => setLessonVideo(e.target.value)} value={lessonVideo}/>

                        <Button text="Ajouter" className={"red-full"} type="submit" isArrow={true} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormMasterclass;
