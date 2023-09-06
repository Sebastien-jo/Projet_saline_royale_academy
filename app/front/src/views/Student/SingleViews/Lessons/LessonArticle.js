import React from 'react';

const LessonArticle = ({lesson}) => {

    console.log("lesson", lesson);

    return(
        <div className="masterclass-container">
            <div className="masterclass-article">
                <h2 className="masterclass-title">{lesson.name}</h2>
                <p className="masterclass-description">{lesson.description}</p>
            </div>
        </div>
    )
}

export default LessonArticle;

