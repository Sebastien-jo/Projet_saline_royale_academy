import React, {useState, useEffect} from 'react';
import Input from "../input";
import Select from "../select";
import Textarea from "../textarea";

const lessonMasterclass = ({index, lessonsContent, setLessonsContent}) => {

    const [name, setName] = useState("");
    const [resume, setResume] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [position, setPosition] = useState(index);
    const [type, setType] = useState("lesson");

    useEffect(() => {
        setLessonsContent((prevLessonsContent) => ({
            ...prevLessonsContent,
            [position]: {
                name: name,
                resume: resume,
                description: description,
                content: content,
                position: position,
            }
        }));
    }, [name, resume, description, content, type]);

    return (
        <div className="lesson-card">
            <div className={"form-row"}>
                <Input name="name" label="Nom" type="text" value={name} onChange={e => setName(e.target.value)} />
                <Select name="type" label="Type" value={type} onChange={e => setType(e.target.value)} list={["exercice", "article", "video"]} />
            </div>
            <Textarea name="resume" label="Résumé" type="text" value={resume} onChange={e => setResume(e.target.value)} />
            <Textarea name="description" label="Description" type="text" value={description} onChange={e => setDescription(e.target.value)} />
            <Input name="content" label="Contenu" type="text" value={content} onChange={e => setContent(e.target.value)} />
        </div>
    );
}

export default lessonMasterclass;