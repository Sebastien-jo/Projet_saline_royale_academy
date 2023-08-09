import React, {useState} from 'react';
import Input from "../input";
import ButtonIcon from "../../button/buttonIcon";
import LessonMasterclass from "./lessonMasterclass";
import plus from "../../../assets/icones/icon-add-White.svg";


const SectionMasterclass = (index, sectionsContent, setSectionsContent) => {

    const [name, setName] = useState("");
    const [position, setPosition] = useState(index);
    const [lessonsContent, setLessonsContent] = useState({});
    const [lessons, setLessons] = useState([]);
    const [nbLessons, setNbLessons] = useState(1);
    const [activeSection, setActiveSection] = useState(0);

    return (
        <div className="form-section">
            <Input name="name" label="Nom" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <div className="section-content">
                <div className="section-lesson-list">
                    {Array.from({ length: nbLessons }).map((_, i) => (
                        <div className={`section-lesson ${i === activeSection ? 'active' : ''}`} key={i} onClick={() => setActiveSection(i)}>
                            <h3>Leçon {i + 1}</h3>
                            <div className="section-lesson-list">
                                <LessonMasterclass index={i + 1} lessonsContent={lessonsContent} setLessonsContent={setLessonsContent} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="section-lesson-add" onClick={() => setNbLessons((prevNbLessons) => prevNbLessons + 1)}>
                    Ajouter une leçon
                </div>
            </div>
        </div>
    );
}

export default SectionMasterclass;