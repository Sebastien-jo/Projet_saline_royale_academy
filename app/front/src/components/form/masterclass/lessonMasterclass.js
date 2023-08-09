import React, {useState} from 'react';
import Input from "../input";
import Select from "../select";

const lessonMasterclass = (index, lessonsContent, setLessonsContent) => {

    const [name, setName] = useState("");
    const [resume, setResume] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [position, setPosition] = useState(index);
    const [type, setType] = useState("lesson");

    return (
        <div className="lesson-card">
            <Input name="name" label="Nom" type="text" value={name} onChange={e => setName(e.target.value)} />
            <Input name="resume" label="Résumé" type="text" value={resume} onChange={e => setResume(e.target.value)} />
            <Input name="description" label="Description" type="text" value={description} onChange={e => setDescription(e.target.value)} />
            <Input name="content" label="Contenu" type="text" value={content} onChange={e => setContent(e.target.value)} />
            <Select name="type" label="Type" value={type} onChange={e => setType(e.target.value)} list={["exercice", "article", "video"]} />
        </div>
    );
}

export default lessonMasterclass;