import React, {useState, useEffect} from 'react';
import Input from "../input";
import ButtonIcon from "../../button/buttonIcon";
import LessonMasterclass from "./lessonMasterclass";
import plus from "../../../assets/icones/icon-add-Default.svg";
import Button from "../../button/button";
import {useTranslation} from "react-i18next";


const SectionMasterclass = ({index, sectionsContent, setSectionsContent}) => {

    const { i18n, t } = useTranslation();


    const [name, setName] = useState("");
    const [position, setPosition] = useState(index);
    const [lessonsContent, setLessonsContent] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [nbLessons, setNbLessons] = useState(0);
    const [activeSection, setActiveSection] = useState(0);

    useEffect(() => {
        setSectionsContent((prevSectionsContent) => {
            const updatedContent = [...prevSectionsContent]; // Create a copy of the array

            // Adjusting 'position' to array index
            const arrayIndex = position - 1;

            updatedContent[arrayIndex] = {
                name: name,
                lessonsContent: lessonsContent,
                position: position
            };

            return updatedContent;
        });
    }, [name, lessonsContent, nbLessons]);

    return (
        <div className="form-section">
            <Input name="name" label={ t('admin.masterclass.form.chapter_name') } type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <div className="section-content">
                <div className="section-lesson-list">
                    {Array.from({ length: nbLessons }).map((_, i) => (
                        <div className={`section-lesson ${i === activeSection ? 'active' : ''}`} key={i} onClick={() => setActiveSection(i)}>
                            <h3>{ t('admin.masterclass.form.lesson') } {i + 1}</h3>
                            <div className="section-lesson-list">
                                <LessonMasterclass index={i + 1} lessonsContent={lessonsContent} setLessonsContent={setLessonsContent} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="section-lesson-add">
                    <Button text={ t('admin.masterclass.form.add_lesson') } className={"blue-stroke"} isIcon={true} icon={plus} click={() => setNbLessons(nbLessons + 1)} />
                </div>


            </div>
        </div>
    );
}

export default SectionMasterclass;