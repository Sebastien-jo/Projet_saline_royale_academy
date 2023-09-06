import React, { useEffect, useState } from 'react';
import LessonArticle from './LessonArticle';
import LessonExercice from './LessonExercice';
import LessonVideo from './LessonVideo';
import { useLocation } from 'react-router-dom';
import Button from "../../../../components/button/button";
import SidebarChapter from "../../../../components/sidebar/Masterclass/sidebarChapter";
import useMasterclassUser from "../../../../hooks/api/useMasterclassUser";

const MasterclassChapter = () => {
    const location = useLocation();

    const lessons = location.state.chapter.lessons;
    const idMasterclass = location.state.id;

    // Use state to keep track of the currently displayed lesson
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

    // Get the current lesson based on the index
    const currentLesson = lessons[currentLessonIndex];

    const {handleValidate} = useMasterclassUser();






    lessons.map((item, index) => {
        item.videoUrl ? item.type = "video" : item.type = "article";
    });


    console.log("heelo", lessons);
    // Function to move to the next lesson
    const goToNextLesson = (id) => {

        if (currentLessonIndex < lessons.length - 1) {
            setCurrentLessonIndex(currentLessonIndex + 1);
        }

        handleValidate(id).then((response) => {
            console.log("check");
        }).catch((err) => {
            console.log(err);
        })
    };

    const gotToPreviousLesson = () => {
        if (currentLessonIndex > 0) {
            setCurrentLessonIndex(currentLessonIndex - 1);
        }
    }

    // Render the appropriate lesson component based on the lesson type
    const renderLessonComponent = (lesson) => {
        if (lesson.type === 'article') {
            return <LessonArticle lesson={lesson} />;
        }
        if (lesson.type === 'exercise') {
            return <LessonExercice lesson={lesson} />;
        }
        if (lesson.type === 'video') {
            return <LessonVideo lesson={lesson} />;
        }
        return null;
    };



    return (
        <div className="main-container">
            <div className="main-content isSidebar">
                <div className="lesson-content">
                    {renderLessonComponent(currentLesson)}
                </div>

            </div>

            <div className="sidebar-controls">


                <Button className={"blue-stroke"} text={"Retour"} link={`#/masterclass/${idMasterclass}`} isArrow={true}/>

                <div className="sidebar-center">

                    {currentLessonIndex > 0 && currentLessonIndex < lessons.length - 1 && (
                        <Button className="red-full" click={gotToPreviousLesson} text="Précédent" />
                    )}

                    {currentLessonIndex < lessons.length - 1 && (
                        <Button className="red-full" click={goToNextLesson} text="Valider" />
                    )}
                </div>

                <Button className="blue-full"  link={`#/masterclass/${idMasterclass}`} text="Terminer" />
            </div>
        </div>
    );
};

export default MasterclassChapter;
