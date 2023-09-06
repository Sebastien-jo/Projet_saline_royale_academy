import React, {useState, useEffect, useRef} from 'react';
import Input from "../input";
import Select from "../select";
import Textarea from "../textarea";
import InputFile from "../inputFile";

const lessonMasterclass = ({index, lessonsContent, setLessonsContent}) => {

    const [name, setName] = useState("");
    const [resume, setResume] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [position, setPosition] = useState(index);
    const [type, setType] = useState("lesson");
    const [video, setVideo] = useState("");
    const [exercice, setExercice] = useState("");

    const inputRefVideo = useRef();
    const inputRefExercice = useRef();

    useEffect(() => {
        setLessonsContent((prevLessonsContent) => {
            const updatedContent = [...prevLessonsContent]; // Create a copy of the array

            // Adjusting 'position' to array index
            const arrayIndex = position - 1;

            if (type === "lesson_video") {
                updatedContent[arrayIndex] = {
                    name: name,
                    resume: resume,
                    description: description,
                    content: content,
                    position: position,
                    type: type,
                    videoUrl: video
                };
            } else {
                updatedContent[arrayIndex] = {
                    name: name,
                    resume: resume,
                    description: description,
                    content: content,
                    position: position,
                    type: type
                };
            }

            return updatedContent;
        });
    }, [name, resume, description, content, type, video, exercice]);



    return (
        <div className="lesson-card">
            <div className={"form-row"}>
                <Input name="name" label="Nom" type="text" value={name} onChange={e => setName(e.target.value)} />
                <Select name="type" label="Type" value={type} onChange={e => setType(e.target.value)} list={["lesson_exercice", "lesson_article", "lesson_video"]} />
            </div>
            {
                type ?
                    <>
                        <Textarea name="resume" label="Résumé" type="text" value={resume} onChange={e => setResume(e.target.value)} />
                        <Textarea name="description" label="Description" type="text" value={description} onChange={e => setDescription(e.target.value)} />
                        <Input name="content" label="Contenu" type="text" value={content} onChange={e => setContent(e.target.value)} />

                        {
                            type === "lesson_video" ?
                                <Input name="video" label="Lien video" type="text" value={video} onChange={e => setVideo(e.target.value)} />
                                :
                                null
                        }
                       {/* {
                            type === "lesson_exercice" ?
                                <InputFile ref={inputRefExercice} name="pdf" label="Exercice" type="file" value={exercice} onChange={e => setExercice(e.target.value)} />
                        }*/}
                    </>
                    :
                    null
        }


           </div>
    );
}

export default lessonMasterclass;