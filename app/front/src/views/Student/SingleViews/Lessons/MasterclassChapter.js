import React, {useEffect, useState} from 'react';
import SidebarChapter from "../../../../components/sidebar/Masterclass/sidebarChapter";
import LessonArticle from "./LessonArticle";
import LessonExercice from "./LessonExercice";
import LessonVideo from "./LessonVideo";
import {useParams} from "react-router-dom";


const MasterclassChapter = () => {

    const masterclass = useParams();
    const [selectedLesson, setSelectedLesson] = useState(null); // Store selected lesson data

    const handleLessonSelect = (lesson) => {
        setSelectedLesson(lesson);
    };

    useEffect(() => {
        setSelectedLesson(masterclass);
    }, [masterclass]);

    return(
        <div className="main-container">
            <div className="main-content isSidebar">
                <div className="lesson-content">
                    {selectedLesson && (
                        // Conditionally render the appropriate lesson component based on the lesson type
                        {
                            article: <LessonArticle lesson={selectedLesson} />,
                            exercise: <LessonExercice lesson={selectedLesson} />,
                            video: <LessonVideo lesson={selectedLesson} />,
                        }[selectedLesson.type]
                    )}
                </div>
            </div>
            <SidebarChapter setLesson={handleLessonSelect} />
        </div>
    )
}

export default MasterclassChapter;