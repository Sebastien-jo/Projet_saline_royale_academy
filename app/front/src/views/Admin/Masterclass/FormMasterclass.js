import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Input from "../../../components/form/input";
import Select from "../../../components/form/select";
import Textarea from "../../../components/form/textarea";
import Button from "../../../components/button/button";
import {getMasterclass} from "../../../api/endpoints/masterclass";
import SectionMasterclass from "../../../components/form/masterclass/sectionMasterclass";
import LessonMasterclass from "../../../components/form/masterclass/lessonMasterclass";
import "../../../styles/masterclass.css";

const FormMasterclass = ({text}) => {

    const id = useParams().id;
    const [masterclass, setMasterclass] = useState([]);

    const [title, setTitle] = useState(id ? masterclass.title : "");
    const [composer, setComposer] = useState(id ? masterclass.composer : "");
    const [teacher, setTeacher] = useState(id ? masterclass.teacher : "");
    const [lessonVideo, setLessonVideo] = useState(id ? masterclass.lessonVideo : "");
    const [sectionsContent, setSectionsContent] = useState(id ? masterclass.sectionsContent : {});
    const [nbSections, setNbSections] = useState(id ? masterclass.nbSections : 1);


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
        console.log("submit");
    }

    return (
        <div className="main-container">
            <div className="main-content">
                <h2>{ text }</h2>
                <form onSubmit={handleSubmit} method="POST">
                    <div className={`form-row`}>
                        <div className={`form-first`}>
                            {/* Tilte => text, Composer => select, Teacher => select, lessonVideo => file */}
                            <Input type="text" name="title" label="Titre de la masterclass" onChange={e => setTitle(e.target.value)} value={title}/>
                            <Select name="Teacher" label="Professeur" list={[]} onChange={e => setTeacher(e.target.value)} value={teacher}/>
                        </div>

                        <div className={`form-col form-second`}>

                            {
                                Array.from(Array(nbSections), (_, index) => (

                                    <div className="section-container" key={index}>
                                        <h3>Chapitre { index + 1 }</h3>
                                        <div className="section-lesson-list">
                                            <SectionMasterclass index={index + 1} sectionsContent={sectionsContent} setSectionsContent={setSectionsContent} />
                                        </div>
                                    </div>
                                ))
                            }

                            <div className="add-section" onClick={() => setNbSections(nbSections + 1)}>
                                <span>Ajouter un chapitre</span>
                            </div>
                        </div>
                    </div>



                   {/* <Button text="Ajouter" className={"red-full"} type="submit" isArrow={true} />*/}

                </form>
            </div>
        </div>
    );
}

export default FormMasterclass;
