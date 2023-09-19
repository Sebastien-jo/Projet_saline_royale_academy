import React from 'react';

const cardLesson = ({lesson}) => {

    return(
        <div className="lesson_details_row">
            <div className={"lesson_row"}>
                <div className="lesson_icon_chevron"></div>
                <div className="lesson_details_infos">{lesson.name}</div>

            </div>

            <div className={"lesson_details_content"}>
                <div className={"lesson_details_infos_time"}>{lesson.content}</div>
                <p></p>
                {
                    lesson.videoUrl ?
                        <div className={"lesson_details_infos_type"}><strong>Type:</strong> Vidéo</div>
                        :
                        <div className={"lesson_details_infos_type"}><strong>Type:</strong> Article</div>
                }
            </div>
        </div>
    )
}

export default cardLesson;